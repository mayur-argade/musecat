const express = require('express');
const router = express.Router();

const { isLoggedin, isUserLoggedin, isVerified, requiredRole } = require('../middleware/authMiddleware')

const { getUserNotification, getVendorNotification, clearNotifications, clearUserNotification } = require('../controllers/NotifcationController')

router.route('/notification/all').get(isLoggedin, isVerified, getVendorNotification)
router.route('/notification/delete').delete(isLoggedin, isVerified, clearNotifications)
router.route('/user/notification/all').get(isUserLoggedin, getUserNotification)
router.route('/user/notification/delete').delete(isUserLoggedin, clearUserNotification)

module.exports = router;