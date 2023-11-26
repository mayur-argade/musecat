const eventService = require("../services/event-service");
const paymentService = require("../services/payment-service");
const ticketService = require("../services/ticket-service");
const userService = require("../services/user-service");
const notificationService = require('../services/notification-service')
const moment = require('moment')

module.exports.generateTicket = async (req, res) => {
    try {
        const { eventid, firstname, lastname, email, ticketclass, seats, priceWithTax, type, cardid, date } = req.body

        let status;
        let selectedCategory;
        let totalPrice;

        // check event exists or not
        let event = await eventService.findEvent({ _id: eventid })
        // console.log("line 18", event)

        if (!event) {
            return res.status(404).json({
                success: false,
                data: "No event found"
            })
        }

        // check if event has price, className, seats
        let hasPrice = []
        let hasClassName = []
        let hasSeats = []


        for (const category of event.categories) {
            if (category.price != null) {
                hasPrice.push(category.price)
            }
            if (category.seats != null) {
                hasSeats.push(category.seats)
            }
            if (category.className != null) {
                hasClassName.push(category.className)
            }
        }

        console.log("hasPrice, hasClassName, hasSeats", hasPrice, hasClassName, hasSeats)

        // category 1 (has price, has classname, has seats)
        if (hasPrice.length != 0 && hasClassName.length != 0 && hasSeats.length != 0) {
            // check the ticket class and then take that category into the consideration
            for (const category of event.categories) {
                if (category.className == ticketclass) {
                    selectedCategory = category
                }
            }

            // console.log("selectedCategory", selectedCategory)
            let bookedSeatsForDate;
            let availableSeats;

            if (selectedCategory.seats && selectedCategory.seats !== 0) {
                // eventDetails, newEvent
                bookedSeatsForDate = await ticketService.returnBookedSeatsbyDate(selectedCategory.bookedSeats, date);
                availableSeats = selectedCategory.seats - bookedSeatsForDate.newEvent.seats.length;
                if (availableSeats < seats) {
                    return res.status(400).json({
                        success: false,
                        data: `Available seats are less than the required seats. Remaining seats are ${availableSeats}`
                    });
                }
            }

            // eventDetails: updatedEventDetails,
            // newAssignedSeats: {date: newEvent.date,seats: allotedSeats}
            const newSeats = await ticketService.allotSeats(bookedSeatsForDate.eventDetails, date, selectedCategory.className, seats, selectedCategory);

            console.log("line 82", newSeats.eventDetails)

            if (priceWithTax) {
                let taxAmout;
                let basePricewithTax;

                if (selectedCategory.price != null || selectedCategory.price != undefined || selectedCategory.price != 0) {
                    taxAmout = selectedCategory.price * 0.05
                    basePricewithTax = Math.round(selectedCategory.price + taxAmout)
                    finalBasePrice = basePricewithTax
                    totalPrice = basePricewithTax * seats
                    status = 'funnel'
                    if (basePricewithTax != priceWithTax) {
                        return res.status(400).json({
                            success: false,
                            data: "Price is not matched with the calculated price"
                        })
                    }
                }
            }

            let ticketData = {
                userid: req.user._id,
                date: new Date(date),
                eventid: eventid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                class: selectedCategory?.className ?? null,
                seats: seats ? seats : null,
                allotedSeats: newSeats.newAssignedSeats.seats,
                totalPrice: totalPrice ? totalPrice : null,
                status: status ? status : "Awaiting Confirmation",
                basePrice: selectedCategory?.price ?? null,
                priceWithTax: finalBasePrice ? finalBasePrice : null
            }


            // Ticket - create a ticket
            let ticket = await ticketService.createTicket(ticketData)

            // console.log("line 121", ticket)

            // Event - add ticket id into the eventmodel
            let tickets = event.bookedTickets
            tickets.push(ticket._id)

            // Event - add eventDetails to the eventModel
            const existingCategoryIndex = event.categories.findIndex(category => category.className === newSeats.eventDetails.className);

            if (existingCategoryIndex !== -1) {
                // Update existing category
                event.categories[existingCategoryIndex] = newSeats.eventDetails;
            } else {
                // Push new category
                event.categories.push(newSeats.eventDetails);
            }

            const eventdata = {
                _id: event._id,
                bookedTickets: tickets,
                categories: event.categories
            }

            const updatedEvent = await eventService.updateEvent(eventdata)

            // console.log("line 134", updatedEvent)

            // user
            let user = await userService.findUser({ _id: req.user._id })
            // User - add eventid into the users pastpurchased
            let pastpurchased = user.pastPurchase
            pastpurchased.push(eventid)
            // User - add ticketid into the users bookedTickets
            let BookedTickets = user.BookedTickets
            BookedTickets.push(ticket._id)
            user.save()
            // console.log("line 145", user)

            let payment;

            if (finalBasePrice) {
                if (cardid == null || cardid == undefined || cardid == '') {
                    if (req.user.payment_customer_id == null || req.user.payment_customer_id == undefined) {
                        const createACustomer = await paymentService.createCustomer({
                            userid: req.user._id,
                            email: req.user.email
                        })

                        if (createACustomer.success != true) {
                            return res.status(500).json({
                                success: false,
                                data: "Unable to create a customer"
                            })
                        }
                    }

                    const paymentdata = {
                        ticketid: ticket._id,
                        customerId: req.user.payment_customer_id,
                        client_ref_id: req.user._id,
                        name: event.title,
                        quantity: seats,
                        unitAmout: Math.round(finalBasePrice)
                    }

                    payment = await paymentService.CreateSession(paymentdata)

                    if (payment.data.code >= 4000 && payment.data.code <= 4301 || payment.data.success == false) {
                        const pendingTicketData = {
                            _id: ticket._id,
                            status: 'pending'
                        }

                        ticket = await ticketService.updateTicket(pendingTicketData)

                        return res.status(500).json({
                            success: false,
                            data: {
                                seatsbooked: ticket,
                                message: "Unable to start payment session"
                            }
                        })
                    }

                    if (payment.success == true || payment.data.session_id != null || payment.data.session_id != undefined) {
                        const sessionTicketData = {
                            _id: ticket._id,
                            status: 'processing',
                            sessionId: payment.data.session_id
                        }

                        ticket = await ticketService.updateTicket(sessionTicketData)

                        return res.status(200).json({
                            success: true,
                            data: `https://uatcheckout.thawani.om/pay/${payment.data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`
                        })
                    }
                } else {
                    const paymentintentdata = {
                        cardid: cardid,
                        ticketid: ticket._id,
                        amount: totalPrice,
                        email: email
                    }

                    const paymentIntent = await paymentService.createPaymentIntent(paymentintentdata)

                    const pendingTicketData = {
                        _id: ticket._id,
                        status: 'pending'
                    }

                    ticket = await ticketService.updateTicket(pendingTicketData)

                    const confirmPaymentIntent = await paymentService.confirmPaymentIntent({
                        paymet_intent_id: paymentIntent.data.id
                    })

                    return res.status(200).json({
                        success: true,
                        data: confirmPaymentIntent.data.next_action.url
                    })
                }
            }

            const notificationData = {
                senderid: req.user._id,
                receiverid: event.vendorid,
                msg: `Ticket has been booked for event ${event.title} please verify`
            }

            const notification = await notificationService.createNotification(notificationData)

            return res.status(200).json({
                seatsbooked: ticket,
                data: `https://uatcheckout.thawani.om/pay/${payment.data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`
            })
        }

        // has price has classname no seats
        else if (hasPrice.length != 0 && hasClassName.length != 0 && hasSeats.length == 0) {
            if (!priceWithTax && !ticketclass && !seats) {
                return res.status(400).json({
                    success: false,
                    data: "Bad Request"
                })
            }
            else {
                try {
                    if (ticketclass) {
                        for (const category of event.categories) {
                            if (category.className == ticketclass) {
                                selectedCategory = category
                            }
                        }
                        console.log("Getting selected cateogory")
                        // eventDetails, newEvent
                        bookedSeatsForDate = await ticketService.returnBookedSeatsbyDate(selectedCategory.bookedSeats, date);

                        // eventDetails: updatedEventDetails,
                        // newAssignedSeats: {date: newEvent.date,seats: allotedSeats}
                        const newSeats = await ticketService.allotSeats(bookedSeatsForDate.eventDetails, date, selectedCategory.className, seats, selectedCategory);

                    }

                    if (priceWithTax) {
                        let taxAmout;
                        let basePricewithTax;

                        if (selectedCategory.price != null || selectedCategory.price != undefined || selectedCategory.price != 0) {
                            taxAmout = selectedCategory.price * 0.05
                            basePricewithTax = Math.round(selectedCategory.price + taxAmout)
                            finalBasePrice = basePricewithTax
                            totalPrice = basePricewithTax * seats
                            status = 'funnel'
                            if (basePricewithTax != priceWithTax) {
                                return res.status(400).json({
                                    success: false,
                                    data: "Price is not matched with the calculated price"
                                })
                            }
                        }
                    }

                    let ticketData = {
                        userid: req.user._id,
                        date: new Date(date),
                        eventid: eventid,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        class: selectedCategory?.className ?? null,
                        seats: seats ? seats : null,
                        allotedSeats: newSeats.newAssignedSeats.seats,
                        totalPrice: totalPrice ? totalPrice : null,
                        status: status ? status : "Awaiting Confirmation",
                        basePrice: selectedCategory?.price ?? null,
                        priceWithTax: finalBasePrice ? finalBasePrice : null
                    }


                    // Ticket - create a ticket
                    let ticket = await ticketService.createTicket(ticketData)

                    // console.log("line 121", ticket)

                    // Event - add ticket id into the eventmodel
                    let tickets = event.bookedTickets
                    tickets.push(ticket._id)

                    // Event - add eventDetails to the eventModel
                    const existingCategoryIndex = event.categories.findIndex(category => category.className === newSeats.eventDetails.className);

                    if (existingCategoryIndex !== -1) {
                        // Update existing category
                        event.categories[existingCategoryIndex] = newSeats.eventDetails;
                    } else {
                        // Push new category
                        event.categories.push(newSeats.eventDetails);
                    }

                    const eventdata = {
                        _id: event._id,
                        bookedTickets: tickets,
                        categories: event.categories
                    }

                    const updatedEvent = await eventService.updateEvent(eventdata)

                    // console.log("line 134", updatedEvent)

                    // user
                    let user = await userService.findUser({ _id: req.user._id })
                    // User - add eventid into the users pastpurchased
                    let pastpurchased = user.pastPurchase
                    pastpurchased.push(eventid)
                    // User - add ticketid into the users bookedTickets
                    let BookedTickets = user.BookedTickets
                    BookedTickets.push(ticket._id)
                    user.save()

                    let payment;

                    if (finalBasePrice) {
                        const paymentdata = {
                            ticketid: ticket._id,
                            client_ref_id: req.user._id,
                            name: event.title,
                            quantity: seats,
                            unitAmout: Math.round(finalBasePrice)
                        }
                        payment = await paymentService.CreateSession(paymentdata)

                        if (payment.data.code >= 4000 && payment.data.code <= 4301 || payment.data.success == false) {
                            const pendingTicketData = {
                                _id: ticket._id,
                                status: 'pending'
                            }

                            ticket = await ticketService.updateTicket(pendingTicketData)

                            return res.status(500).json({
                                success: false,
                                data: {
                                    seatsbooked: ticket,
                                    message: "Unable to start payment session"
                                }
                            })
                        }

                        if (payment.success == true || payment.data.session_id != null || payment.data.session_id != undefined) {
                            const sessionTicketData = {
                                _id: ticket._id,
                                status: 'processing',
                                sessionId: payment.data.session_id
                            }

                            ticket = await ticketService.updateTicket(sessionTicketData)
                        }
                    }

                    const notificationData = {
                        senderid: req.user._id,
                        receiverid: event.vendorid,
                        msg: `Ticket has been booked for event ${event.title} please verify`
                    }

                    const notification = await notificationService.createNotification(notificationData)

                    return res.status(200).json({
                        seatsbooked: ticket,
                        session_id: payment?.data.session_id ?? null
                    })

                } catch (error) {
                    console.log(error)
                }

            }
        }

        // no price has classname no seats
        else if (hasPrice.length == 0 && hasClassName.length != 0 && hasSeats.length == 0) {
            console.log("No price has classname has seats")
            let bookedSeatsForDate;
            try {
                if (ticketclass) {
                    for (const category of event.categories) {
                        if (category.className == ticketclass) {
                            selectedCategory = category
                        }
                    }

                    // eventDetails, newEvent
                    bookedSeatsForDate = await ticketService.returnBookedSeatsbyDate(selectedCategory.bookedSeats, date);

                    // eventDetails: updatedEventDetails,
                    // newAssignedSeats: {date: newEvent.date,seats: allotedSeats}
                }

                const newSeats = await ticketService.allotSeats(bookedSeatsForDate.eventDetails, date, selectedCategory.className, seats, selectedCategory);

                let ticketData = {
                    userid: req.user._id,
                    eventid: eventid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    class: selectedCategory?.className ?? null,
                    seats: seats ? seats : null,
                    allotedSeats: newSeats.newAssignedSeats.seats,
                    status: status ? status : "Awaiting Confirmation",
                }
                let ticket = await ticketService.createTicket(ticketData)

                // event
                let tickets = event.bookedTickets
                tickets.push(ticket._id)
                event.save()

                // ticket
                selectedCategory.bookedSeats = newSeats.newBookedSeats
                ticket.save()

                // user
                let user = await userService.findUser({ _id: req.user._id })
                let pastpurchased = user.pastPurchase
                let BookedTickets = user.BookedTickets
                pastpurchased.push(eventid)
                BookedTickets.push(ticket._id)
                user.save()

                const notificationData = {
                    senderid: req.user._id,
                    receiverid: event.vendorid,
                    msg: `Ticket has been booked for event ${event.title} please verify`
                }

                const notification = await notificationService.createNotification(notificationData)

                return res.status(200).json({
                    seatsbooked: ticket,
                    session_id: null
                })

            } catch (error) {
                console.log(error)
            }
        }
        // no price has classname has seats
        else if (hasPrice.length == 0 && hasClassName.length != 0 && hasSeats.length != 0) {
            console.log("No price has classname has seats")
            let bookedSeatsForDate;

            try {
                if (ticketclass) {
                    for (const category of event.categories) {
                        if (category.className == ticketclass) {
                            selectedCategory = category
                        }
                    }

                    // eventDetails, newEvent
                    bookedSeatsForDate = await ticketService.returnBookedSeatsbyDate(selectedCategory.bookedSeats, date);
                    
                    availableSeats = selectedCategory.seats - bookedSeatsForDate.newEvent.seats.length;
                    if (availableSeats < seats) {
                        return res.status(400).json({
                            success: false,
                            data: `Available seats are less than the required seats. Remaining seats are ${availableSeats}`
                        });
                    }

                }

                // eventDetails: updatedEventDetails,
                // newAssignedSeats: {date: newEvent.date,seats: allotedSeats}
                const newSeats = await ticketService.allotSeats(bookedSeatsForDate.eventDetails, date, selectedCategory.className, seats, selectedCategory);

                let ticketData = {
                    userid: req.user._id,
                    eventid: eventid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    class: selectedCategory?.className ?? null,
                    seats: seats ? seats : null,
                    allotedSeats: newSeats.newAssignedSeats.seats,
                    status: status ? status : "Awaiting Confirmation",
                }
                let ticket = await ticketService.createTicket(ticketData)

                // event
                let tickets = event.bookedTickets
                tickets.push(ticket._id)
                event.save()

                // ticket
                selectedCategory.bookedSeats = newSeats.newBookedSeats
                ticket.save()

                // user
                let user = await userService.findUser({ _id: req.user._id })
                let pastpurchased = user.pastPurchase
                let BookedTickets = user.BookedTickets
                pastpurchased.push(eventid)
                BookedTickets.push(ticket._id)
                user.save()
                const notificationData = {
                    senderid: req.user._id,
                    receiverid: event.vendorid,
                    msg: `Ticket has been booked for event ${event.title} please verify`
                }

                const notification = await notificationService.createNotification(notificationData)

                return res.status(200).json({
                    seatsbooked: ticket,
                    session_id: null
                })

            } catch (error) {
                console.log(error)
            }
        }

        // no price
        else if (hasPrice.length == 0 && hasSeats.length == 0 && hasClassName.length == 0) {
            console.log("No price no classname no seats")
            // console.log("selectedCategory", selectedCategory)
            let bookedSeatsForDate;
            let availableSeats;
            try {
                for (const category of event.categories) {
                    selectedCategory = category
                }

                // eventDetails, newEvent
                bookedSeatsForDate = await ticketService.returnBookedSeatsbyDate(selectedCategory.bookedSeats, date);

                // eventDetails: updatedEventDetails,
                // newAssignedSeats: {date: newEvent.date,seats: allotedSeats}
                const newSeats = await ticketService.allotSeats(bookedSeatsForDate.eventDetails, date, 'Basic', seats, selectedCategory);

                let ticketData = {
                    userid: req.user._id,
                    eventid: eventid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    class: selectedCategory?.className ?? null,
                    seats: seats ? seats : null,
                    allotedSeats: newSeats.newAssignedSeats.allotedSeats,
                    status: status ? status : "Awaiting Confirmation",
                }

                let ticket = await ticketService.createTicket(ticketData)

                // event
                let tickets = event.bookedTickets
                tickets.push(ticket._id)
                event.save()

                // ticket
                selectedCategory.bookedSeats = newSeats.newBookedSeats
                ticket.save()

                // user
                let user = await userService.findUser({ _id: req.user._id })
                let pastpurchased = user.pastPurchase
                let BookedTickets = user.BookedTickets
                pastpurchased.push(eventid)
                BookedTickets.push(ticket._id)
                user.save()

                const notificationData = {
                    senderid: req.user._id,
                    receiverid: event.vendorid,
                    msg: `Ticket has been booked for event ${event.title} please verify`
                }

                const notification = await notificationService.createNotification(notificationData)
                return res.status(200).json({
                    seatsbooked: ticket,
                    session_id: null
                })

            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }
}

module.exports.ticketStatus = async (req, res) => {
    const ticketid = req.params.ticketid

    try {
        const ticket = await ticketService.findTicket({ _id: ticketid })
        const event = await eventService.findEvent({ _id: ticket.eventid })
        return res.status(200).json({
            success: true,
            data: {
                ticket: ticket,
                event: event
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.getAllTickets = async (req, res) => {
    try {
        // booked tickes from tickets table
        const events = await eventService.findAllEvents({ vendorid: req.user._id })
        // console.log(events)


        const totalBookedSeats = events.reduce((accumulator, event) => {
            // Add the length of bookedSeats for each event to the accumulator
            return accumulator + event.bookedSeats.length;
        }, 0);


        // Extract ticket IDs from all events
        const allTicketIds = events.reduce((accumulator, event) => {
            return accumulator.concat(event.bookTickets);
        }, []);

        // console.log(allTicketIds)

        const tickets = await ticketService.findAllTickets({ _id: { $in: allTicketIds } })

        // console.log(tickets)

        return res.status(200).json({
            success: true,
            data: {
                seatsBooked: totalBookedSeats,
                tickets: tickets
            }
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getTicketsByEvent = async (req, res) => {
    const { eventid } = req.params

    console.log(eventid)
    try {

        const tickets = await ticketService.findTickets({ eventid: eventid })

        res.status(200).json({
            success: true,
            data: tickets
        })
    } catch (error) {
        console.log(error)
    }
    // try {
    //     const event = await eventService.findEvent({ _id: eventid })
    //     const seatsBooked = event.bookedSeats.length

    //     const allTicketIds = event.bookTickets
    //     const tickets = await ticketService.findAllTickets({ _id: { $in: allTicketIds } })


    //     return res.status(200).json({
    //         success: true,
    //         data: {
    //             seatsBooked: seatsBooked,
    //             tickets: tickets
    //         }
    //     })
    // } catch (error) {
    //     console.log(error)
    // }

}

exports.getTicketIdByEventIduser = async (req, res) => {
    try {
        // const userid = req.user._id
        // const eventid = req.body.eventid
        // console.log(eventid)

        // const event = await eventService.findEvent({ _id: eventid })
        // const bookedTickets = event.bookTickets

        // console.log(bookedTickets)
        // for (const tickets of bookedTickets) {
        //     console.log(tickets)
        //     // const ticket = ticketService.findTicket({ _id: tickets })

        //     // if (ticket.userid == userid) {
        //     //     return res.status(200).json({ ticketid: ticket._id })
        //     // }
        // }
        console.log("funtion running")
        // return res.status(404).json({
        //     success: false,
        //     data: "No ticket found"
        // })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: error
        })
    }

}

exports.updateStatusUsingSessionId = async (req, res) => {

    const { ticketid } = req.body

    let ticket = await ticketService.findTicket({ _id: ticketid })

    // console.log(ticket)

    const sessionId = ticket.sessionId

    const sessionInfo = await paymentService.getSessionInfo(sessionId)
    if (sessionInfo.success == true && sessionInfo.data.payment_status == 'paid') {
        const ticketdata = {
            _id: ticket._id,
            status: "Awaiting Approval"
        }
        ticket = await ticketService.updateTicket(ticketdata)
    }



    res.status(200).json({
        success: true,
        data: ticket
    })

    // console.log(sessionInfo)

}

exports.updateStatusOfTicketbyVendor = async (req, res) => {
    try {
        let { ticketid, status } = req.body

        let ticket = await ticketService.findTicket({ _id: ticketid })
        // console.log(ticket)
        let event;
        if (status == 'canceled') {
            // delete seats 
            event = await eventService.findEvent({ _id: ticket.eventid });
            for (const category of event.categories) {
                category.bookedSeats = category.bookedSeats.filter(seat => !ticket.allotedSeats.includes(seat));
                // console.log(category.bookedSeats);
            }
            // console.log(event.categories);


            // check for payment
            if (ticket.sessionId) {
                status = "refunded"
                // go for refund process
                // change the status to the refunded
            }

        }
        const ticketdata = {
            _id: ticket._id,
            status: status
        }

        ticket = await ticketService.updateTicket(ticketdata)

        res.status(200).json({
            success: true,
            data: ticket
        })

    } catch (error) {
        console.log(error)
    }
}

exports.downloadTicketPdf = async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Replace this with the logic to generate your PDF content dynamically
        const pdfContent = `
            <html>
                <head>
                    <style>
                    div.container {
                        /* display: none; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        max-width: 810px;
                        overflow: hidden
                      }
                    
                      .custom-qr-code {
                        background-color: transparent !important; /* Make the background transparent */
                      }
                      
                      /* Change black color to white */
                      .custom-qr-code svg rect {
                        fill: white !important; /* Change the fill color to white */
                      }
                    
                      .container .item {
                        width: 100%;
                        height: 310px;
                        float: left;
                        /* padding: 0 0px; */
                        background: #fff;
                        overflow: hidden;
                        margin: 10px
                      }
                      .container .item-right, .container .item-left {
                        float: left;
                        padding: 15px 
                      }
                      .container .item-right {
                        background-color: #C0A04C;
                        /* padding: 79px 50px; */
                        /* margin-right: 20px; */
                        width: 273px;
                        position: relative;
                        height: 330px
                      }
                      .container .item-right .up-border, .container .item-right .down-border {
                          padding: 14px 15px;
                          background-color: #ddd;
                          border-radius: 50%;
                          position: absolute
                      }
                      .container .item-right .up-border {
                        top: -10px;
                        right: 260px;
                      }
                      .container .item-right .down-border {
                        bottom: 8px;
                        right: 260px;
                      }
                      .container .item-right .num {
                        font-size: 60px;
                        text-align: center;
                        color: #111
                      }
                      .container .item-right .day, .container .item-left .event {
                        color: #555;
                        font-size: 20px;
                        margin-bottom: 9px;
                      }
                      .container .item-right .day {
                        text-align: center;
                        font-size: 25px;
                      }
                      .container .item-left {
                        width: 65%;
                        padding: 34px 0px 19px 46px;
                        border-right: 3px dotted #999;
                      } 
                      .container .item-left .title {
                        color: #111;
                        font-size: 34px;
                        margin-bottom: 12px
                      }
                      .container .item-left .sce {
                        margin-top: 5px;
                        display: block
                      }
                      .item-left .sce .icon, .item-left .sce p,
                      .item-left .loc .icon, .item-left .loc p{
                          float: left;
                          word-spacing: 5px;
                          letter-spacing: 1px;
                          color: #888;
                          margin-bottom: 10px;
                      }
                      .item-left .sce .icon,  .item-left .loc .icon {
                        margin-right: 10px;
                        font-size: 20px;
                        color: #666
                      }
                        .item-left .loc {display: block}
                      .fix {clear: both}
                       .item .tickets, .booked, .cancel{
                          color: #fff;
                          padding: 6px 14px;
                          float: right;
                          margin-top: 10px;
                          font-size: 18px;
                          border: none;
                          cursor: pointer
                      }
                       .item .tickets {background: white}
                       .item .booked {background: #3D71E9}
                       .item .cancel {background: #DF5454}
                      .linethrough {text-decoration: line-through}
                    
                      @media only screen and (max-width: 1150px) {
                        .container .item {
                          width: 100%;
                          margin-right: 20px
                        }
                        div.container {
                          margin: 0 20px auto
                        }
                      }
                    
                      @media only screen and (max-width: 767px) {
                        .container .item {
                            width: 100%;
                            margin-right: 20px
                          }
                          div.container {
                            margin: 0 20px auto
                          }
                      }
                    </style>
                </head>
                <body>
                <div id="ticketContent" class="container bg-white rounded-lg">
                <div class="item rounded-2xl">
                    <div class="item-left">
                        <div className='flex justify-between items-center align-middle '>
                            <img className='mt-5 h-5' src="/images/logo/logo.png" alt="" />
                            {/* <img className='h-10 mr-5' src="/images/assets/logoticket.png" alt="" /> */}
                            <p class="font- text-md mt-5 mr-5 ">{ticket._id}</p>
                        </div>
                        <div className='flex space-x-10'>

                            <p class="font-bold text-md mt-5">{event.title}</p>


                        </div>
                        <div class="">
                            <p className='font-bold text-md mt-5'>${ticket.firstname} {ticket.lastname}</p>
                            <p className='font-medium text-md mt-5'>${ticket.email}</p>
                            <div className='flex justify-between mt-10'>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>Date</p>
                                    <p className='font-medium text-sm'>${moment(ticket.date).format("DD-MM-YYYY")}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>Class</p>
                                    <p className='font-medium text-sm'>${ticket.class}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>No. of Seats</p>
                                    <p className='font-medium text-sm'>${ticket.seats}</p>
                                </div>
                                <div className='flex flex-col mr-5'>
                                    <p className='font-light text-sm'>Status</p>
                                    <p className='font-medium text-sm'>${ticket.status}</p>
                                </div>
                            </div>
                        </div>
                        <span class="tickets">Tickets</span>
                    </div>
                    <div class="item-right">
                        {/* <img className='h-60 mt-5' src="/images/assets/qrcode.png" alt="" /> */}
                        <QRCode value=${qrCodeValue} className='mt-5'
                            bgColor="#C0A04C" fgColor="#ffff" level='L' size="240" />
                        <span class="up-border"></span>
                        <span class="down-border"></span>
                    </div>
                </div>

            </div>
                </body>
            </html>
        `;

        await page.setContent(pdfContent);
        const pdfBuffer = await page.pdf();

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=generated-pdf.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
}
