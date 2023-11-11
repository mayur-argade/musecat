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
    AdditionalPhotos: {
        type: Array,
        default: []
    },
    Banner: {
        type: String,
    },
    seatingMap: {
        type: String,
    },
    Video: {
        type: String,
    },
    shortDescription: {
        type: String,
    },
    description: {
        type: String,
        require: [true, "Please provide description for an event"]
    },
    trending: {
        type: Boolean,
        default: false
    },

    date: {
        type: {
            type: String,
            enum: ['dateRange', 'recurring'],
            // required: true,
        },

        dateRange: {
            startDate: Date, // Start date of the event
            endDate: Date,   // End date of the event
        },

        recurring: {
            startDate: Date,
            endDate: Date,
            days: [{
                type: String,
                enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
            }],
            startTime: String,
            endTime: String,
        },
    },

    categories: [
        {
            className: {
                type: String,
                // required: true
            },
            seats: {
                type: Number,
                // required: true
            },
            price: {
                type: Number,
                // required: true
            },
            bookedSeats: [{
                date: Date,
                seats: Array
            }], // Add this field to track booked seats
        },
    ],

    bookedTickets: {
        type: Array,
        default: []
    },

    discountOnApp: {
        type: Number
    },

    type: {
        type: String,
        enum: ['event', 'offer']
    },

    eventCategory: {
        type: Array,
        default: [],
    },

    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
        required: [true, "Please provide location details for the event"]
    },
    venueInfo: {
        type: String,
        require: [true, "Please provide Venue description for an event"]
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
        type: Array,
        default: []
    },

    termsAndConditions: {
        type: String,
        required: true
    },

    verified: {
        type: Boolean,
        default: false
    },

    phoneNo: {
        type: Number
    },
    website: {
        type: String
    },

    whatsapp: {
        type: Number
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    showEndEvent: {
        type: Boolean,
        default: false
    },
    email: {
        type: String
    }
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model('Events', eventSchema);