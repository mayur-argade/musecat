const mongoose = require('mongoose')

const ticketModel = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    class: {
        type: String,
    },
    date: {
        type: Date,
    },
    seats: {
        type: Number,
        // required: true
    },
    allotedSeats: {
        type: Array,
        // required: true
    },
    totalPrice: {
        type: Number,
        // required: true
    },
    status: {
        type: String,
    },
    basePrice: {
        type: Number,
    },
    priceWithTax: {
        type: Number
    },
    sessionId: {
        type: String
    },
    refundId: {
        type: String
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Tickets', ticketModel)