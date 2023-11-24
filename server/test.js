const moment = require('moment');
function allotSeats(eventDetails, searchDate, className, seats) {
    const searchMoment = moment(searchDate);
    const searchDateWithTimeZero = searchMoment.startOf('day'); // Set time to 00:00:00

    let newEvent = eventDetails.find(event =>
        moment(event.date).startOf('day').isSame(searchDateWithTimeZero)
    );

    if (newEvent !== undefined) {
        let allotedSeats = [];
        let seatNumber = 1;
        let updatedBookedSeats = { ...newEvent, seats: newEvent.seats || [] };

        while (allotedSeats.length < seats) {
            const seatId = `${className.charAt(0)}${seatNumber}`;

            if (!updatedBookedSeats.seats.includes(seatId)) {
                allotedSeats.push(seatId);
                updatedBookedSeats.seats.push(seatId);
            }

            seatNumber++;
        }

        // Update eventDetails array
        const updatedEventDetails = eventDetails.map(event => {
            if (moment(event.date).startOf('day').isSame(searchDateWithTimeZero)) {
                return updatedBookedSeats;
            }
            return event;
        });

        return {
            eventDetails: updatedEventDetails,
            newAssignedSeats: {
                date: updatedBookedSeats.date,
                seats: updatedBookedSeats.seats
            }
        };
    } else {
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

        return {
            eventDetails: updatedEventDetails,
            newAssignedSeats: {
                date: newEvent.date,
                seats: allotedSeats
            }
        };
    }
}

const result = allotSeats(
    [
       
    ],
    '2023-11-22',
    'atlas',
    3
);

console.log(result);
