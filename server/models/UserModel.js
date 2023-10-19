const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please provide email"],
        unique: true
    },
    authid: {
        type: String
    },
    photo: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
    mobilenumber: {
        type: Number
    },
    favorites: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
        default: []
    },
    pastPurchase: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
        default: []
    },
    BookedTickets: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tickets" }],
        default: []
    },
    verificationToken: {
        type: String
    },
    passwordToken: {
        type: String
    }
},
    {
        timestamp: true,
    }
)

module.exports = mongoose.model('Users', userSchema)