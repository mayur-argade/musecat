const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendors',
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('Notifications', notificationSchema);