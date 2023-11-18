const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "please provide firstname"],
    },
    lastname: {
        type: String,
        required: [true, "Please provide lastname"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
    },
    message: {
        type: String,
        required: [true, "Please provide message"]
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('ContactUs', contactSchema)