const UserModel = require('../models/UserModel');
const VendorModel = require('../models/VendorModel');
const notificationService = require('../services/notification-service')

exports.getVendorNotification = async (req, res) => {

    const data = {
        receiverid: req.user._id,
        status: "read"
    }

    try {
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

exports.sendNotificationToUsers = async (req, res) => {
    try {


        const { msg, user, vendor } = req.body

        if (user) {
            // Fetch all user IDs from the database
            const allUserIds = await UserModel.find({ isVerified: true }, '_id');

            // Create notifications for each user
            const notificationPromises = allUserIds.map(async (userId) => {
                const userNotification = {
                    senderid: req.user._id,
                    receiverid: userId._id.toString(),
                    msg: msg
                };
                console.log(userId)
                return await notificationService.createNotification(userNotification);
            });

            // Wait for all notifications to be created
            const notifications = await Promise.all(notificationPromises);
        }

        if (vendor) {
            // Fetch all user IDs from the database
            const allVendorIds = await VendorModel.find({ isVerified: true, role: 'vendor' }, '_id');

            console.log(allVendorIds)

            // Create notifications for each user
            const notificationPromises = allVendorIds.map(async (userId) => {
                const userNotification = {
                    senderid: req.user._id,
                    receiverid: userId._id.toString(),
                    msg: msg
                };

                return await notificationService.createNotification(userNotification);
            });

            // Wait for all notifications to be created
            const notifications = await Promise.all(notificationPromises);
        }

        return res.status(200).json({
            success: true,
            data: "Notification sent"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data: "Internal server error"
        })

    }

}