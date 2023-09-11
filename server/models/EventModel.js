const mongoose = require('mongoose')
const validator = require('validator')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title for an event"]
    },
    displayPhoto: {
        type: String,
        // required: [true, "Please provide event Display photo"]
    },
    Banner:{
        type: String,
    },
    Video: {
        type: String,
    },
    shortDescription:{
        type: String,
    },
    description: {
        type: String,
        require: [true, "Please provide description for an event"]
    },
    date: {
        type: Date,
        required: [true, "Please provide date and time for an event"]
    },
    category:{
        type: String,
    },
    location: {
        type: String,
        required: [true, "Please provide location details for the event"]
    },
    silverSeats: {
        type: Number,
        required: [true, "please provide number of silver seats for the event"]
    },
    silverPrice: {
        type: Number,
        required: [true, "Please provide price for silver class seats"]
    },
    goldSeats: {
        type: Number,
        required: [true, "please provide number of gold seats for the event"]
    },
    goldPrice: {
        type: Number,
        required: [true, "Please provide price for gold class seats"]
    },
    platinumSeats: {
        type: Number,
        required: [true, "Please provide number of platinum class seats"]
    },
    platinumPrice: {
        type: Number,
        required: [true, "Please provide price for platinum class seats"]
    },
    vendorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendors',
        required: true,
    },
    custom: [
        String
    ],
    likes: {
        type: Array,
        default: []
    },
    features: {
        type: String,
    },
    bookTickets: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tickets" }],
        default: []
    },
    bookedSeats: {
        type: Array,
        default: []
    },
    bookedPlatinumSeats: {
        type: Array,
        default: []
    },
    bookedGoldSeats: {
        type: Array,
        default: []
    },
    bookedSilverSeats: {
        type: Array,
        default: []
    }

},
    {
        timestamps: true
    }

)

module.exports = mongoose.model('Events', eventSchema);