const express = require('express');
const router = express.Router();
const { isLoggedin, isVerified, isUserLoggedin } = require('../middleware/authMiddleware')


const { updateVendorProfile, getVendorProfile, getAllNotifications, getUserProfile, updateUserProfile, writeContactMessage, getFavoriteEvents, getEventDetails, getPastPurchase, getVendorDetails } = require('../controllers/UserController')
const { vendorHome } = require('../controllers/EventController')

router.route('/vendor/update-profile').patch(isLoggedin, updateVendorProfile)
router.route('/vendor/profile').get(isLoggedin, getVendorProfile)
router.route('/vendor/notifications').get(isLoggedin, isVerified, getAllNotifications)
router.route('/vendor/home').get(isLoggedin, isVerified, vendorHome)

router.route('/user/update-profile').patch(isUserLoggedin, updateUserProfile)
router.route('/user/profile').get(isUserLoggedin, getUserProfile)
router.route('/user/write-contactmsg').post(writeContactMessage)

router.route('/user/favorites').get(isUserLoggedin, getFavoriteEvents)

router.route('/user/eventDetails/:eventid').get(getEventDetails)

router.route('/user/pastpurchased').get(isUserLoggedin, getPastPurchase)

router.route('/vendor/details/:vendorid').get(getVendorDetails)
module.exports = router;
