const NotificationModel = require('../models/NotificationModel')

class NotificationService {
    async getAllNotifications(filter) {
        const notifications = await NotificationModel.find(filter)
        return notifications
    }

}

module.exports = new NotificationService();