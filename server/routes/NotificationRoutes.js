const express = require('express');
const router = express.Router();

const { isLoggedin, isUserLoggedin, isVerified, requiredRole } = require('../middleware/authMiddleware')

const { getUserNotification, getVendorNotification, clearNotifications, clearUserNotification, countunreadNotifications, sendNotificationToUsers } = require('../controllers/NotifcationController')

router.route('/notification/all').get(isLoggedin, isVerified, getVendorNotification)
router.route('/notification/delete').delete(isLoggedin, isVerified, clearNotifications)
router.route('/user/notification/all').patch(isUserLoggedin, getUserNotification)
router.route('/user/notification/delete').delete(isUserLoggedin, clearUserNotification)
router.route('/notification/count').get(isUserLoggedin, countunreadNotifications)
router.route('/vendor/notification/count').get(isLoggedin, countunreadNotifications)
router.route('/notification/send-notification').post(isLoggedin, sendNotificationToUsers)
module.exports = router;