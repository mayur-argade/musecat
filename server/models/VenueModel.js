const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayPhoto: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        required: true,
    },
    events: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
        default: []
    }
},
    {
        timestamp: true,
    }
)

module.exports = mongoose.model('Venue', venueSchema)