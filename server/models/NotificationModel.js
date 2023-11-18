const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    senderid: {
        type: String,
        required: true
    },
    receiverid: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
}

)


module.exports = mongoose.model('Notifications', notificationSchema);