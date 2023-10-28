const eventService = require("../services/event-service");
const paymentService = require("../services/payment-service");
const ticketService = require("../services/ticket-service");
const userService = require("../services/user-service");
const notificationService = require('../services/notification-service')

// if seats are there then book else dont allot seats
// if price is there then show payment else book ticket with status awatingconfirmation
// 

module.exports.generateTicket = async (req, res) => {
    const { eventid, firstname, lastname, email, ticketclass, seats, priceWithTax, type, cardid } = req.body
    let status;
    let selectedCategory;
    let totalPrice;
    let newSeats
    let finalBasePrice

    let event = await eventService.findEvent({ _id: eventid })
    let hasPrice = [];
    let hasClassName = [];
    let hasSeats = [];

    for (const category of event.categories) {
        if (category.price != null) {
            hasPrice.push(category.className)
        }
        if (category.seats != null) {
            hasSeats.push(category.className)
        }
        if (category.className != null) {
            hasClassName.push(category.className)
        }
    }

    // has price has classname has seats
    if (hasPrice.length != 0 && hasClassName.length != 0 && hasSeats.length != 0) {
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

                    if (selectedCategory.seats != null || selectedCategory.seats != undefined || selectedCategory.seats != 0) {
                        const availableSeats = selectedCategory.seats - selectedCategory.bookedSeats.length

                        if (availableSeats < seats) {
                            return res.status(400).json({
                                success: false,
                                data: "Available seats are less than the required seats"
                            })
                        }

                        const bookedSeats = selectedCategory.bookedSeats
                        newSeats = await ticketService.allotSeats(bookedSeats, selectedCategory.className, seats)
                        // console.log(allotedSeats)
                    }

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
                    eventid: eventid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    class: selectedCategory?.className ?? null,
                    seats: seats ? seats : null,
                    allotedSeats: newSeats.allotedSeats,
                    totalPrice: totalPrice ? totalPrice : null,
                    status: status ? status : "Awaiting Confirmation",
                    basePrice: selectedCategory?.price ?? null,
                    priceWithTax: finalBasePrice ? finalBasePrice : null
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

                        console.log("paymentintent---->", paymentIntent)

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

            } catch (error) {
                console.log(error)
            }

        }
    }

    // has price has classname no seats
    if (hasPrice.length != 0 && hasClassName.length != 0 && hasSeats.length == 0) {
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

                    const bookedSeats = selectedCategory.bookedSeats
                    newSeats = await ticketService.allotSeats(bookedSeats, selectedCategory.className, seats)
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
                    eventid: eventid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    class: selectedCategory?.className ?? null,
                    seats: seats ? seats : null,
                    allotedSeats: newSeats.allotedSeats,
                    totalPrice: totalPrice ? totalPrice : null,
                    status: status ? status : "Awaiting Confirmation",
                    basePrice: selectedCategory?.price ?? null,
                    priceWithTax: finalBasePrice ? finalBasePrice : null
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

    // no price not classname no seats
    if (hasPrice.length == 0 && hasClassName.length == 0 && hasSeats.length == 0) {
        if (!seats) {
            return res.status(400).json({
                success: false,
                data: "Bad Request"
            })
        }
        else {
            try {
                let bookedSeats = event.categories[0].bookedSeats
                newSeats = await ticketService.allotSeats(bookedSeats, "Basic", seats)

                let ticketData = {
                    userid: req.user._id,
                    eventid: eventid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    class: "Basic",
                    seats: seats ? seats : null,
                    allotedSeats: newSeats.allotedSeats,
                    status: status ? status : "Awaiting Confirmation",
                }

                let ticket = await ticketService.createTicket(ticketData)

                // event
                let tickets = event.bookedTickets
                tickets.push(ticket._id)
                event.save()

                // ticket
                event.categories[0].bookedSeats = newSeats.newBookedSeats
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
    }

    // no price has classname has seats
    if (hasPrice.length == 0 && hasClassName.length != 0 && hasSeats.length != 0) {
        try {
            if (ticketclass) {
                for (const category of event.categories) {
                    if (category.className == ticketclass) {
                        selectedCategory = category
                    }
                }

                const bookedSeats = selectedCategory.bookedSeats
                newSeats = await ticketService.allotSeats(bookedSeats, selectedCategory.className, seats)
            }

            let ticketData = {
                userid: req.user._id,
                eventid: eventid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                class: selectedCategory?.className ?? null,
                seats: seats ? seats : null,
                allotedSeats: newSeats.allotedSeats,
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
    if (hasPrice.length == 0 && hasSeats.length == 0 && hasClassName.length != 0) {
        try {
            if (ticketclass) {
                for (const category of event.categories) {
                    if (category.className == ticketclass) {
                        selectedCategory = category
                    }
                }

                const bookedSeats = selectedCategory.bookedSeats
                newSeats = await ticketService.allotSeats(bookedSeats, selectedCategory.className, seats)
            }

            let ticketData = {
                userid: req.user._id,
                eventid: eventid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                class: selectedCategory?.className ?? null,
                seats: seats ? seats : null,
                allotedSeats: newSeats.allotedSeats,
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


    // try {
    //     // check if event is valid or not
    //     const event = await eventService.findEvent({ _id: eventid })

    //     if (ticketclass) {
    //         for (const category of event.categories) {
    //             if (category.className == ticketclass) {
    //                 selectedCategory = category
    //             }
    //         }



    //         if (selectedCategory.seats != null || selectedCategory.seats != undefined || selectedCategory.seats != 0) {
    //             const availableSeats = selectedCategory.seats - selectedCategory.bookedSeats.length

    //             if (availableSeats < seats) {
    //                 return res.status(400).json({
    //                     success: false,
    //                     data: "Available seats are less than the required seats"
    //                 })
    //             }

    //             const bookedSeats = selectedCategory.bookedSeats
    //             allotedSeats = ticketService.allotSeats(bookedSeats, selectedCategory.className, seats)
    //         }

    //     }
    //     // check if available seats are there or not

    //     if (priceWithTax) {
    //         let taxAmout;
    //         let basePricewithTax;

    //         if (selectedCategory.price != null || selectedCategory.price != undefined || selectedCategory.price != 0) {
    //             taxAmout = selectedCategory.price * 0.05
    //             basePricewithTax = selectedCategory.price + taxAmout
    //             finalBasePrice = Math.round(basePricewithTax)
    //             totalPrice = basePricewithTax * seats
    //             status = 'funnel'
    //             if (basePricewithTax != priceWithTax) {
    //                 return res.status(400).json({
    //                     success: false,
    //                     data: "Price is not matched with the calculated price"
    //                 })
    //             }
    //         }
    //     }

    //     let ticketData = {
    //         userid: req.user._id,
    //         eventid: eventid,
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email,
    //         class: selectedCategory?.className ?? null,
    //         seats: seats ? seats : null,
    //         allotedSeats: allotedSeats ? seats : null,
    //         totalPrice: totalPrice ? totalPrice : null,
    //         status: status ? status : "Awaiting Confirmation",
    //         basePrice: selectedCategory?.price ?? null,
    //         priceWithTax: finalBasePrice ? finalBasePrice : null
    //     }

    //     let ticket = await ticketService.createTicket(ticketData)

    //     let payment;

    //     if (finalBasePrice) {

    //         const paymentdata = {
    //             client_ref_id: req.user._id,
    //             name: event.title,
    //             quantity: seats,
    //             unitAmout: finalBasePrice
    //         }

    //         payment = await paymentService.CreateSession(paymentdata)

    //         console.log(payment)

    //         if (payment.data.code >= 4000 && payment.data.code <= 4301 || payment.data.success == false) {
    //             const pendingTicketData = {
    //                 _id: ticket._id,
    //                 status: 'pending'
    //             }

    //             ticket = await ticketService.updateTicket(pendingTicketData)

    //             return res.status(500).json({
    //                 success: false,
    //                 data: {
    //                     seatsbooked: ticket,
    //                     message: "Unable to start payment session"
    //                 }
    //             })
    //         }

    //         if (payment.success == true || payment.data.session_id != null || payment.data.session_id != undefined) {
    //             const sessionTicketData = {
    //                 _id: ticket._id,
    //                 status: 'processing',
    //                 sessionId: payment.data.session_id
    //             }

    //             ticket = await ticketService.updateTicket(sessionTicketData)
    //         }
    //     }

    //     return res.status(200).json({
    //         seatsbooked: ticket,
    //         session_id: payment?.data.session_id ?? null
    //     })

    // } catch (error) {
    //     console.log(error)
    // }



    // const { eventid, firstname, lastname, email, ticketclass, seats, row, totalPrice, basePrice } = req.body

    // try {

    //     const event = await eventService.findEvent({ _id: eventid })

    //     let seatsAvail;
    //     let emptyArray = []
    //     let seatsBooked = [];
    //     let initial;
    //     let newBookedTickets = event.bookTickets
    //     if (ticketclass == 'platinum') {
    //         seatsAvail = event.platinumSeats - event.bookedPlatinumSeats.length
    //         seatsBooked = event.bookedPlatinumSeats
    //         initial = 'P'

    //     } else if (ticketclass == 'gold') {
    //         seatsAvail = event.platinumSeats - event.bookedGoldSeats.length
    //         seatsBooked = event.bookedGoldSeats
    //         initial = 'G'
    //     } else if (ticketclass == 'silver') {
    //         seatsAvail = event.platinumSeats - event.bookedSilverSeats.length
    //         seatsBooked = event.bookedSilverSeats
    //         initial = 'S'
    //     }

    //     // console.log(seatsAvail)

    //     if (seatsAvail < seats) {
    //         return res.status(404).json({
    //             success: false,
    //             data: `seats remaining for ${ticketclass} are ${seatsAvail}, please select another class`
    //         })
    //     }
    //     let seatsAlloted = []
    //     let totalBookedSeats = event.bookedSeats

    //     for (let i = 1; i <= seats; i++) {
    //         totalBookedSeats.push(`${initial}${seatsBooked.length + 1}`)
    //         seatsAlloted.push(`${initial}${seatsBooked.length + 1}`)
    //         seatsBooked.push(`${initial}${seatsBooked.length + 1}`)
    //     }

    //     // console.log(seatsBooked)


    //     const ticketdata = {
    //         userid: req.user._id,
    //         eventid: eventid,
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email,
    //         class: ticketclass,
    //         seats: seats,
    //         row: row,
    //         totalPrice: totalPrice,
    //         allotedSeats: seatsAlloted
    //     }

    //     const ticket = await ticketService.createTicket(ticketdata)

    //     newBookedTickets.push(ticket._id)

    //     let data = {};

    //     if (ticketclass == 'platinum') {
    //         data = {
    //             _id: eventid,
    //             bookedPlatinumSeats: seatsBooked,
    //             bookTickets: newBookedTickets,
    //             bookedSeats: totalBookedSeats
    //         }

    //     } else if (ticketclass == 'gold') {
    //         data = {
    //             _id: eventid,
    //             bookedGoldSeats: seatsBooked,
    //             bookTickets: newBookedTickets,
    //             bookedSeats: totalBookedSeats
    //         }
    //     } else if (ticketclass == 'silver') {
    //         data = {
    //             _id: eventid,
    //             bookedSilverSeats: seatsBooked,
    //             bookTickets: newBookedTickets,
    //             bookedSeats: totalBookedSeats
    //         }
    //     }

    //     const updateevent = await eventService.updateEvent(data)

    //     const updatedEvent = await eventService.findEvent({ _id: eventid })

    //     // console.log(req.user)
    //     let pastpurchasedEvents = req.user.pastPurchase
    //     let userTickets = req.user.BookedTickets
    //     console.log(req.user)
    //     // console.log(req.user.BookedTickets)
    //     // console.log(userTickets)
    //     userTickets.push(ticket._id)

    //     // console.log(pastpurchasedEvents)
    //     if (!pastpurchasedEvents.includes(eventid)) {
    //         pastpurchasedEvents.push(eventid)

    //         const userdata = {
    //             _id: req.user._id,
    //             pastPurchase: pastpurchasedEvents,
    //             BookedTickets: userTickets
    //         }
    //         const updateUser = await userService.updateUser(userdata)
    //     }

    //     const paymentdata = {
    //         client_ref_id: req.user._id,
    //         name: ticket._id,
    //         quantity: seats,
    //         unitAmout: basePrice
    //     }

    //     const payment = await paymentService.CreateSession(paymentdata)

    //     console.log(payment)

    //     if (payment.code >= 4000 && payment.code <= 4301 || payment.success == false) {
    //         return res.status(500).json({
    //             success: false,
    //             data: {
    //                 seatsbooked: ticket,
    //                 message: "Unable to start payment session"
    //             }
    //         })
    //     }

    //     return res.status(200).json({
    //         seatsbooked: ticket,
    //         session_id: payment.data.session_id
    //     })


    // } catch (error) {
    //     console.log(error)
    // }
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
