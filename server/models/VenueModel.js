const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendors',
        required: true,  
    },
    events: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
        default: []
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Venue', venueSchema)