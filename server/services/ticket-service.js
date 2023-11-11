const TicketModel = require("../models/TicketModel");
const moment = require('moment')

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
        let allotedSeats = [];
        console.log(bookedSeats)
        let seatNumber = 1;
        let updatedBookedSeats = { ...bookedSeats, seats: bookedSeats.seats || [] }; // Ensure 'seats' is initialized
    
        while (allotedSeats.length < seats) {
            const seatId = `${className.charAt(0)}${seatNumber}`;
    
            if (!updatedBookedSeats.seats.includes(seatId)) {
                allotedSeats.push(seatId);
                updatedBookedSeats.seats.push(seatId);
            }
    
            seatNumber++;
        }
    
        return {
            allotedSeats,
            updatedBookedSeats,
        };
    }
    

    async returnBookedSeatsbyDate(eventDetails, searchDate) {
        const matchingEvent = eventDetails.find(event => event.date.toISOString() === searchDate.toISOString());

        if (matchingEvent) {
            return matchingEvent;
        } else {
            // If no matching date found, create an entry
            const newEvent = { date: new Date(searchDate), seats: [] };
            eventDetails.push(newEvent);
            return newEvent;
        }
    }

}

module.exports = new TicketService();