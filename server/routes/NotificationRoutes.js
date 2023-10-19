const express = require('express');
const router = express.Router();

const { isLoggedin, isUserLoggedin, isVerified, requiredRole } = require('../middleware/authMiddleware')

const { getVendorNotification } = require('../controllers/NotifcationController')

router.route('/notification/all').get(isLoggedin, isVerified, getVendorNotification)



module.exports = router;