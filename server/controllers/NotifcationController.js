const notificationService = require('../services/notification-service')

exports.getVendorNotification = async (req, res) => {

    const notifications = await notificationService.getAllNotifications({ receiverid: req.user._id })

    let messages = [];

    for (const notification of notifications) {
        messages.push(notification.msg)
    }

    res.status(200).json({
        success: true,
        data: messages
    })
}