const notificationService = require('../services/notification-service')

exports.getVendorNotification = async (req, res) => {

    try {
        const notifications = await notificationService.getAllNotifications({ receiverid: req.user._id })

        let messages = [];

        for (const notification of notifications) {
            messages.push(notification.msg)
        }

        res.status(200).json({
            success: true,
            data: messages
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
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

exports.clearUserNotification = async (req, res) => {
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

exports.getUserNotification = async (req, res) => {
    try {
        const data = {
            receiverid: req.user._id,
            status: "read"
        }

        const updatedResult = await notificationService.updateNotification(data)

        const notifications = await notificationService.getAllNotifications({ receiverid: req.user._id })

        let messages = [];

        for (const notification of notifications) {
            messages.push(notification.msg)
        }

        res.status(200).json({
            success: true,
            data: messages
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })
    }
}

exports.countunreadNotifications = async (req, res) => {
    try {

        const notificationCount = await notificationService.countNotification({ receiverid: req.user._id, status: "unread" })

        return res.status(200).json({
            success: true,
            data: notificationCount
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            data: "Internal server error"
        })
    }
}