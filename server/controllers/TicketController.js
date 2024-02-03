const eventService = require("../services/event-service");
const paymentService = require("../services/payment-service");
const ticketService = require("../services/ticket-service");
const userService = require("../services/user-service");
const notificationService = require('../services/notification-service')
const moment = require('moment')
const { transporter } = require('../services/mail-service');
const TicketModel = require("../models/TicketModel");

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
                    basePricewithTax = selectedCategory.price + taxAmout
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
                        unitAmout: finalBasePrice
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

                        const notificationData = {
                            senderid: req.user._id,
                            receiverid: event.vendorid._id,
                            msg: `Ticket has been booked for event ${event.title} please verify`
                        }

                        const userNotification = {
                            senderid: event.vendorid._id,
                            receiverid: req.user._id,
                            msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                        }
                        const notification = await notificationService.createNotification(notificationData)
                        const usernotification = await notificationService.createNotification(userNotification)


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
                        status: 'pending',
                        payment_intent_id: paymentIntent.data.id
                    }

                    ticket = await ticketService.updateTicket(pendingTicketData)

                    const confirmPaymentIntent = await paymentService.confirmPaymentIntent({
                        paymet_intent_id: paymentIntent.data.id
                    })

                    if (confirmPaymentIntent.success == false) {
                        return res.status(200).json({
                            success: false,
                            data: "Unable to retrive payment intent"
                        })
                    }

                    const notificationData = {
                        senderid: req.user._id,
                        receiverid: event.vendorid._id,
                        msg: `Ticket has been booked for event ${event.title} please verify`
                    }

                    const userNotication = {
                        senderid: event.vendorid._id,
                        receiverid: req.user._id,
                        msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                    }
                    const notification = await notificationService.createNotification(notificationData)
                    const usernotification = await notificationService.createNotification(userNotication)

                    return res.status(200).json({
                        success: true,
                        data: confirmPaymentIntent.data.next_action.url
                    })
                }
            }

            return res.status(200).json({
                seatsbooked: ticket,
                data: `https://uatcheckout.thawani.om/pay/${payment.data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`
            })
        }

        // (CP) has price has classname no seats
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

                    }
                    const newSeats = await ticketService.allotSeats(bookedSeatsForDate.eventDetails, date, selectedCategory.className, seats, selectedCategory);

                    if (priceWithTax) {
                        let taxAmout;
                        let basePricewithTax;

                        if (selectedCategory.price != null || selectedCategory.price != undefined || selectedCategory.price != 0) {
                            taxAmout = selectedCategory.price * 0.05
                            basePricewithTax = selectedCategory.price + taxAmout
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
                                unitAmout: finalBasePrice
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

                                const notificationData = {
                                    senderid: req.user._id,
                                    receiverid: event.vendorid,
                                    msg: `Ticket has been booked for event ${event.title} please verify`
                                }

                                const userNotification = {
                                    senderid: event.vendorid,
                                    receiverid: req.user._id,
                                    msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                                }
                                const notification = await notificationService.createNotification(notificationData)
                                const usernotification = await notificationService.createNotification(userNotication)


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
                                status: 'pending',
                                payment_intent_id: paymentIntent.data.id
                            }

                            ticket = await ticketService.updateTicket(pendingTicketData)

                            const confirmPaymentIntent = await paymentService.confirmPaymentIntent({
                                paymet_intent_id: paymentIntent.data.id
                            })

                            if (confirmPaymentIntent.success == false) {
                                return res.status(200).json({
                                    success: false,
                                    data: "Unable to retrive payment intent"
                                })
                            }

                            const notificationData = {
                                senderid: req.user._id,
                                receiverid: event.vendorid._id,
                                msg: `Ticket has been booked for event ${event.title} please verify`
                            }

                            const userNotication = {
                                senderid: event.vendorid._id,
                                receiverid: req.user._id,
                                msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                            }

                            const notification = await notificationService.createNotification(notificationData)
                            const usernotification = await notificationService.createNotification(userNotification)

                            return res.status(200).json({
                                success: true,
                                data: confirmPaymentIntent.data.next_action.url
                            })
                        }
                    }

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
                    receiverid: event.vendorid._id,
                    msg: `Ticket has been booked for event ${event.title} please verify`
                }

                const userNotification = {
                    senderid: event.vendorid._id,
                    receiverid: req.user._id,
                    msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                }
                const notification = await notificationService.createNotification(notificationData)
                const usernotification = await notificationService.createNotification(userNotification)


                return res.status(200).json({
                    seatsbooked: ticket,
                    session_id: null
                })

            } catch (error) {
                console.log(error)
            }
        }

        // (CS) no price has classname has seats
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

                const notificationData = {
                    senderid: req.user._id,
                    receiverid: event.vendorid._id,
                    msg: `Ticket has been booked for event ${event.title} please verify`
                }

                const userNotification = {
                    senderid: event.vendorid._id,
                    receiverid: req.user._id,
                    msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                }
                const notification = await notificationService.createNotification(notificationData)
                const usernotification = await notificationService.createNotification(userNotification)


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
                    receiverid: event.vendorid._id,
                    msg: `Ticket has been booked for event ${event.title} please verify`
                }

                const userNotification = {
                    senderid: event.vendorid._id,
                    receiverid: req.user._id,
                    msg: `Your ticket has been booked successfully for the ${event.title} please wait till vendor Verifies it`
                }
                const notification = await notificationService.createNotification(notificationData)
                const usernotification = await notificationService.createNotification(userNotification)

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

    const sessionId = ticket.sessionId

    if (ticket.status == "verified") {
        return res.status(200).json({
            success: true,
            data: ticket
        })
    }
    else if (sessionId != null || sessionId != undefined) {

        const sessionInfo = await paymentService.getSessionInfo(sessionId)
        if (sessionInfo.success == true && sessionInfo.data.payment_status == 'paid') {
            const ticketdata = {
                _id: ticket._id,
                status: "verified"
            }
            ticket = await ticketService.updateTicket(ticketdata)
            return res.status(200).json({
                success: true,
                data: ticket
            })
        }

        else {
            const event = await eventService.findEvent({ _id: ticket.eventid });

            if (!event) {
                return res.status(404).json({
                    success: false,
                    data: ticket,
                });
            }

            const targetCategory = event.categories.find((category) => category.className === ticket.class);

            if (targetCategory) {
                const targetBooking = targetCategory.bookedSeats.find(
                    (booking) => moment(ticket.date).format("DD-MM-YYYY") === moment(booking.date).format("DD-MM-YYYY")
                );

                if (targetBooking) {
                    targetBooking.seats = targetBooking.seats.filter((seat) => !ticket.allotedSeats.includes(seat));
                } else {
                    console.log("Target booking date not found");
                }
            } else {
                console.log("Target category not found");
            }

            const ticketData = {
                _id: ticket._id,
                allotedSeats: [],
                status: "failed",
            };

            try {
                await ticketService.updateTicket(ticketData);
                return res.status(200).json({
                    success: true,
                    data: ticket,
                });
            } catch (error) {
                console.error("Error updating ticket:", error);
                return res.status(500).json({
                    success: false,
                    error: "Internal Server Error",
                });
            }

        }
    }
    else if (ticket.payment_intent_id != null || ticket.payment_intent_id != undefined) {
        const paymentInfo = await paymentService.listPaymentByIntent(ticket.payment_intent_id)

        console.log(paymentInfo)

        if (paymentInfo.data[0].status == "successful") {
            const ticketdata = {
                _id: ticket._id,
                status: "verified"
            }

            ticket = await ticketService.updateTicket(ticketdata)

            return res.status(200).json({
                success: true,
                data: ticket
            })
        } else {
            const event = await eventService.findEvent({ _id: ticket.eventid });

            if (!event) {
                return res.status(404).json({
                    success: false,
                    data: ticket,
                });
            }

            const targetCategory = event.categories.find((category) => category.className === ticket.class);

            if (targetCategory) {
                const targetBooking = targetCategory.bookedSeats.find(
                    (booking) => moment(ticket.date).format("DD-MM-YYYY") === moment(booking.date).format("DD-MM-YYYY")
                );

                if (targetBooking) {
                    targetBooking.seats = targetBooking.seats.filter((seat) => !ticket.allotedSeats.includes(seat));
                } else {
                    console.log("Target booking date not found");
                }
            } else {
                console.log("Target category not found");
            }

            const ticketData = {
                _id: ticket._id,
                allotedSeats: [],
                status: "failed",
            };

            try {
                await ticketService.updateTicket(ticketData);
                return res.status(200).json({
                    success: true,
                    data: ticket,
                });
            } catch (error) {
                console.error("Error updating ticket:", error);
                return res.status(500).json({
                    success: false,
                    error: "Internal Server Error",
                });
            }
        }
    }
    else {
        return res.status(200).json({
            success: true,
            data: ticket
        })
    }

}

exports.updateStatusOfTicketbyVendor = async (req, res) => {
    try {
        let { ticketid, status } = req.body

        // console.log(ticketid)

        let ticket = await ticketService.findTicket({ _id: ticketid })
        // console.log(ticket)
        let event;
        if (status == 'verified') {

            const ticketdata = {
                _id: ticketid,
                status: 'verified'
            }
            let updatedTicket;
            try {
                updatedTicket = await TicketModel.updateOne({ _id: ticketid }, { status: "verified" })
            } catch (error) {
                console.log(error)
            }
            // const updatedTicket = await ticketService.updateTicket({ _id: ticketid, status: 'verified' })

            console.log("updated ticket data", updatedTicket)
            // send notification 
            const notification = {
                senderid: req.user._id,
                receiverid: ticket.userid,
                msg: `Your Ticket for event ${ticket.eventid.title} has been verified by the vendor your Ticket ID: ${ticket._id} `
            }

            const sentNotification = await notificationService.createNotification(notification)

            // send mail
            const mailOptions = {
                from: 'argademayur2002@gmail.com',
                to: ticket.email,
                subject: 'Ticket Verification mail',
                html: `
                  <html>
                  <body>
                  <p>Dear ${ticket.firstname},</p>
                  <p>Thank you for booking a ticket on omanwhereto.com. We are excited to have you join us for this event!</p>
                  <p>Your ticket with ID ${ticket._id} has been verified and is now confirmed for the event. Here are the details:</p>
                  <ul>
                    <li>Ticket ID: ${ticket._id}</li>
                    <li>Date and Time: ${moment(ticket.date).format("DD-MM-YYYY")}</li>
                  </ul>
                  <p>Please ensure to bring a copy of this email or the digital version of your ticket with you to the event for smooth entry.</p>                
                  <p>Thank you for choosing omanwhereto.com. We look forward to seeing you at the event!</p>
                  <p>Best regards,<br>The omanwhereto Team</p>
                  </body>
                  </html>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    return res
                        .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                            success: false,
                            data: "Ticket update But failed to send to mail.."
                        });
                } else {
                    return res.status(200).json({
                        success: true,
                        data: ticket
                    })
                }
            });

        }
        else if (status == 'canceled') {
            // delete seats 
            event = await eventService.findEvent({ _id: ticket.eventid });

            const targetCategory = event.categories.find(category => category.className === ticket.class)

            if (targetCategory) {
                const targetBooking = targetCategory.bookedSeats.find(booking => moment(ticket.date).format("DD-MM-YYYY") == moment(booking.date).format("DD-MM-YYYY"));
                // console.log(targetBooking)
                if (targetBooking) {
                    targetBooking.seats = targetBooking.seats.filter(seat => !ticket.allotedSeats.includes(seat));
                    const updatedEvent = await event.save()
                    console.log(updatedEvent.categories)
                } else {
                    console.log("target booking date not found")
                }
            } else {
                console.log("Target category not found")
            }

            // check for payment
            if (ticket.sessionId) {
                status = "refunded"

                // const paymentInfo = await paymentService.refundPayment(ticket.sessionId)

                // console.log("paymentInfo`"`)

                const ticketdata = {
                    _id: ticket._id,
                    status: status,
                    // refundId: paymentInfo.data.refund_id || null
                }

                ticket = await ticketService.updateTicket(ticketdata)

                // send notification 
                const notification = {
                    senderid: req.user._id,
                    receiverid: ticket.userid,
                    msg: `Your Ticket has been canceled by the vendor Ticket ID: ${ticket._id}. Refund for your ticket will be processed shortly`
                }

                const sentNotification = await notificationService.createNotification(notification)

                // send mail
                const mailOptions = {
                    from: 'argademayur2002@gmail.com',
                    to: ticket.email,
                    subject: 'Ticket cancellation mail',
                    html: `
                      <html>
                      <body>
                      <p>Dear ${ticket.firstname},</p>
                      <p>We're sorry to inform you that your booking on omanwhereto.com has been canceled.</p>
                      <p>Your ticket with ID ${ticket._id} for the event has been canceled. Here are the details:</p>
                      <ul>
                        <li>Ticket ID: ${ticket._id}</li>
                        <li>Date and Time: ${moment(ticket.date).format("DD-MM-YYYY")}</li>
                      </ul>
                      <p>Your refund will be processed shortly. If you have any questions or concerns, please don't hesitate to reach out to our support team.</p>
                      <p>We appreciate your understanding. Thank you for considering omanwhereto.com.</p>
                      <p>Best regards,<br>The omanwhereto Team</p>
                    </body>                    
                      </html>
                    `,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        return res
                            .status(statusCode.INTERNAL_SERVER_ERROR.code).json({
                                success: false,
                                data: "Ticket update But failed to send to mail.."
                            });
                    } else {
                        return res.status(200).json({
                            success: true,
                            data: ticket
                        })
                    }
                });


            } else {
                console.log("no session id")
            }

        }
        else {
            return res.status(500).json({
                success: false,
                data: "Unknown status"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

