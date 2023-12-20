const express = require('express');
const router = express.Router();

const { isLoggedin, isUserLoggedin, isVerified, requiredRole } = require('../middleware/authMiddleware')

const { getVendorNotification, clearNotifications } = require('../controllers/NotifcationController')

router.route('/notification/all').get(isLoggedin, isVerified, getVendorNotification)
router.route('/notification/delete').delete(isLoggedin, isVerified, clearNotifications)


module.exports = router;