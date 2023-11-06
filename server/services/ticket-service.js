const TicketModel = require("../models/TicketModel");

class TicketService {
    async findTicket(filter) {
        const ticket = TicketModel.findOne(filter);
        return ticket;
    }

    async findTickets(filter) {
        const tickets = TicketModel.find(filter)
        return tickets
    }

    async findAllTickets(filter, limit) {
        const tickets = TicketModel.find(filter).limit(limit).sort({ date: 1 }).populate({
            path: 'eventid',
            populate: {
              path: 'location',
            },
          })
        return tickets
    }

    async createTicket(data) {
        const ticket = TicketModel.create(data);
        return ticket;
    }

    async updateTicket(data) {
        const ticket = TicketModel.findOneAndUpdate({ _id: data._id }, data)
        return ticket;
    }

    async allotSeats(bookedSeats, className, seats) {
        // console.log("function is running")
        let allotedSeats = [];
        let seatNumber = 1;
        let newBookedSeats = bookedSeats
        // console.log(bookedSeats)
        // console.log(className)
        while (allotedSeats.length < seats) {
            // console.log("entering loop")
            const seatId = `${className.charAt(0)}${seatNumber}`
            if (!bookedSeats.includes(seatId)) {
                allotedSeats.push(seatId);
                newBookedSeats.push(seatId)
                // console.log(allotedSeats)
            }

            seatNumber++

        }
        return {
            allotedSeats,
            newBookedSeats
        }
    }
}

module.exports = new TicketService();