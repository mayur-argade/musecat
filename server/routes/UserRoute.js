const express = require('express');
const router = express.Router();
const { isLoggedin, isVerified, isUserLoggedin, requiredRole } = require('../middleware/authMiddleware')


const { updateVendorProfile, getVendorProfile, getAllNotifications, getUserProfile, updateUserProfile, writeContactMessage, getFavoriteEvents, getEventDetails, getPastPurchase, getVendorDetails, verifyVendor, deleteVendor, getAllUnverifiedVendors, getAllUsers, adminStats, getAllUsersList, getAllVendorsList, deleteUser } = require('../controllers/UserController')
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



router.route('/admin/update-vendor').patch(isUserLoggedin, requiredRole("admin"), verifyVendor)

router.route('/admin/delete-vendor').delete(deleteVendor)

router.route('/admin/get-unverified-vendors').get(getAllUnverifiedVendors)

router.route('/admin/getAllUsers').get(getAllUsers)

router.route('/admin/stats').get(adminStats)

router.route('/admin/list-all-users').get(getAllUsersList)
router.route('/admin/delete-user').delete(deleteUser)
router.route('/admin/list-all-vendors').get(getAllVendorsList)

router.route('/admin/verify-vendor').patch(verifyVendor)

module.exports = router;
