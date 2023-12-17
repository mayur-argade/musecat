const TicketModel = require("../models/TicketModel");
const moment = require('moment')

class TicketService {
    async findTicket(filter) {
        const ticket = TicketModel.findOne(filter).populate({
            path: 'eventid',
            populate: {
                path: 'location',
            },
        });
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

    async allotSeats(eventDetails, searchDate, className, seats, selectedCategory) {
        const searchMoment = moment(searchDate);
        const searchDateWithTimeZero = searchMoment.startOf('day'); // Set time to 00:00:00

        let newEvent = eventDetails.find(event =>
            moment(event.date).startOf('day').isSame(searchDateWithTimeZero)
        );

        if (newEvent !== undefined) {
            let allotedSeats = [];
            let seatNumber = 1;

            while (allotedSeats.length < seats) {
                const seatId = `${className.charAt(0)}${seatNumber}`;

                // Only push the seat if it's not already booked
                if (!newEvent.seats.includes(seatId)) {
                    allotedSeats.push(seatId);
                    newEvent.seats.push(seatId);
                }

                seatNumber++;
            }

            // Update eventDetails array
            const updatedEventDetails = eventDetails.map(event => {
                if (moment(event.date).startOf('day').isSame(searchDateWithTimeZero)) {
                    return newEvent;
                }
                return event;
            });

            selectedCategory.bookedSeats = updatedEventDetails
            const updatedCategory = selectedCategory

            return {
                eventDetails: updatedCategory,
                newAssignedSeats: {
                    date: newEvent.date,
                    seats: allotedSeats
                }
            }
        }
        else {
            newEvent = { date: searchDateWithTimeZero.toDate(), seats: [] };

            // Allocate seats for the new event
            let allotedSeats = [];
            let seatNumber = 1;

            while (allotedSeats.length < seats) {
                const seatId = `${className.charAt(0)}${seatNumber}`;

                if (!newEvent.seats.includes(seatId)) {
                    allotedSeats.push(seatId);
                    newEvent.seats.push(seatId);
                }

                seatNumber++;
            }

            // Update eventDetails array
            const updatedEventDetails = [...eventDetails, newEvent];
            selectedCategory.bookedSeats = updatedEventDetails
            const updatedCategory = selectedCategory
            return {
                eventDetails: updatedCategory,
                newAssignedSeats: {
                    date: newEvent.date,
                    seats: allotedSeats
                }
            };
        }
    }


    async returnBookedSeatsbyDate(eventDetails, searchDate) {
        // check the bookedSeats array date field and match this date with something
        // let newEvent;
        let newEvent = eventDetails.find(event =>
            moment(event.date).startOf('day').isSame(searchDate)
        );
        // newEvent = eventDetails.find(event => event.date.toISOString() === searchDate.toISOString());

        // if got then use that object
        if (newEvent != undefined) {
            return {
                eventDetails,
                newEvent
            };
        } else {
            // if not then create a object where date = given date and seats = []
            newEvent = { date: new Date(searchDate), seats: [] };
            eventDetails.push(newEvent);
            return {
                eventDetails,
                newEvent
            };
        }
    }

}

module.exports = new TicketService();