const TicketModel = require("../models/TicketModel");

class TicketService {
    async findTicket(filter) {
        const ticket = TicketModel.findOne(filter);
        return ticket;
    }

    async findAllTickets(filter, limit) {
        const tickets = TicketModel.find(filter).limit(limit).sort({ date: 1 })
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
        console.log("function is running")
        let allotedSeats = [];
        let seatNumber = 1;

        // console.log(bookedSeats)
        // if(bookedSeats.includes('s3')){
        //     console.log('yes')
        // }else{
        //     console.log('no')
        // }

        while (allotedSeats.length <= seats) {
            // console.log("entering loop")
            const seatId = `${className.charAt(0)}${seatNumber}`
            if (!bookedSeats.includes(seatId)) {
                allotedSeats.push(seatId);
            }

            seatNumber++

        }
        return allotedSeats
    }
}

module.exports = new TicketService();