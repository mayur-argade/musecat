const NotificationModel = require('../models/NotificationModel')

class NotificationService {
    async getAllNotifications(filter) {
        const notifications = await NotificationModel.find(filter)
        return notifications
    }

    async createNotification(data) {
        const notification = NotificationModel.create(data);
        return notification;
    }

    async deleteNotification(filter) {
        const notification = await NotificationModel.deleteOne(filter)
        return notification
    }

    async deleteMany(filter){
        const notification = await NotificationModel.deleteMany(filter)
        return notification
    }

    async countNotification(filter) {
        const notifications = await NotificationModel.countDocuments(filter)
        return notifications
    }
}

module.exports = new NotificationService();