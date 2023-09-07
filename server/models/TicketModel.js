const mongoose = require('mongoose')

const ticketModel = new mongoose.Schema({
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendors',
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
        enum: {
            values: ['platinum', 'silver', 'gold'],
        }
    },
    seats: {
        type: Number,
        required: true
    },
    allotedSeats: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'pending', 'refund']
        },
        default: 'pending'
    },
    row: {
        type: String,
        required: true,
        enum: {
            values: ['platinum', 'silver', 'gold'],
        }
    }

},
    {
        timestamp: true,
    }
)

module.exports = mongoose.model('Tickets', ticketModel)