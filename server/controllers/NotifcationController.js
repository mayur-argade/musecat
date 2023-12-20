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

exports.clearNotifications = async (req, res) => {

    try {
        const notifications = await notificationService.deleteMany({ receiverid: req.user._id })

        return res.status(200).json({
            success: true,
            data: "Notification cleared"
        })
    } catch (error) {

        console.log(error)
        
        return res.status(500).json({
            success: true,
            data: "Internal Server Error"
        })
    }
}