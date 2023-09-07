const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please provide email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
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
    }
},
    {
        timestamp: true,
    }
)

module.exports = mongoose.model('Users', userSchema)