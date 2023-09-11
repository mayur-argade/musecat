const mongoose = require('mongoose')
const validator = require('validator')

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title for an event"]
    },
    photo: {
        type: String,
        // required: [true, "Please provide event Display photo"]
    },
    banner:{
        type: String,
    },
    video:{
        type: String,
    },
    shortDescription: {
        type: String,
    },
    location: {
        type: String,
    },
    
    description: {
        type: String,
        require: [true, "Please provide description for an event"]
    },
    startdate: {
        type: Date,
        required: [true, "Please provide date and time for an event"]
    },
    vendorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendors',
        required: true,
    },
    category: {
        type: String,
    },
    expiry: {
        type: Date,
        required: [true, "Please provide expiry date and time for the event"]
    },
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model('Offers', offerSchema);