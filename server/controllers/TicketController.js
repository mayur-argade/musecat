const eventService = require("../services/event-service");
const ticketService = require("../services/ticket-service");
const userService = require("../services/user-service");

module.exports.generateTicket = async (req, res) => {

    const { eventid, firstname, lastname, email, ticketclass, seats, row, totalPrice } = req.body

    try {

        const event = await eventService.findEvent({ _id: eventid })

        let seatsAvail;
        let emptyArray = []
        let seatsBooked = [];
        let initial;
        let newBookedTickets = event.bookTickets
        if (ticketclass == 'platinum') {
            seatsAvail = event.platinumSeats - event.bookedPlatinumSeats.length
            seatsBooked = event.bookedPlatinumSeats
            initial = 'P'

        } else if (ticketclass == 'gold') {
            seatsAvail = event.platinumSeats - event.bookedGoldSeats.length
            seatsBooked = event.bookedGoldSeats
            initial = 'G'
        } else if (ticketclass == 'silver') {
            seatsAvail = event.platinumSeats - event.bookedSilverSeats.length
            seatsBooked = event.bookedSilverSeats
            initial = 'S'
        }

        // console.log(seatsAvail)

        if (seatsAvail < seats) {
            return res.status(404).json({
                success: false,
                data: `seats remaining for ${ticketclass} are ${seatsAvail}, please select another class`
            })
        }
        let seatsAlloted = []
        let totalBookedSeats = event.bookedSeats

        for (let i = 1; i <= seats; i++) {
            totalBookedSeats.push(`${initial}${seatsBooked.length + 1}`)
            seatsAlloted.push(`${initial}${seatsBooked.length + 1}`)
            seatsBooked.push(`${initial}${seatsBooked.length + 1}`)
        }

        // console.log(seatsBooked)


        const ticketdata = {
            eventid: eventid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            class: ticketclass,
            seats: seats,
            row: row,
            totalPrice: totalPrice,
            allotedSeats: seatsAlloted
        }

        const ticket = await ticketService.createTicket(ticketdata)

        newBookedTickets.push(ticket._id)

        let data = {};

        if (ticketclass == 'platinum') {
            data = {
                _id: eventid,
                bookedPlatinumSeats: seatsBooked,
                bookTickets: newBookedTickets,
                bookedSeats: totalBookedSeats
            }

        } else if (ticketclass == 'gold') {
            data = {
                _id: eventid,
                bookedGoldSeats: seatsBooked,
                bookTickets: newBookedTickets,
                bookedSeats: totalBookedSeats
            }
        } else if (ticketclass == 'silver') {
            data = {
                _id: eventid,
                bookedSilverSeats: seatsBooked,
                bookTickets: newBookedTickets,
                bookedSeats: totalBookedSeats
            }
        }

        const updateevent = await eventService.updateEvent(data)

        const updatedEvent = await eventService.findEvent({ _id: eventid })

        // console.log(req.user)
        let pastpurchasedEvents = req.user.pastPurchase
        console.log(pastpurchasedEvents)
        if (!pastpurchasedEvents.includes(eventid)) {
            pastpurchasedEvents.push(eventid)

            const userdata = {
                _id: req.user._id,
                pastPurchase: pastpurchasedEvents
            }
            const updateUser = await userService.updateUser(userdata)
        }

        return res.status(200).json({
            seatsbooked: ticket
        })


    } catch (error) {
        console.log(error)
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

    try {
        const event = await eventService.findEvent({ _id: eventid })
        const seatsBooked = event.bookedSeats.length

        const allTicketIds = event.bookTickets
        const tickets = await ticketService.findAllTickets({ _id: { $in: allTicketIds } })
        

        return res.status(200).json({
            success: true,
            data: {
                seatsBooked: seatsBooked,
                tickets: tickets
            }
        })
    } catch (error) {
        console.log(error)
    }

}