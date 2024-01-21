const express = require('express');
const router = express.Router();

const { isLoggedin, isUserLoggedin, requiredRole } = require("../middleware/authMiddleware")

const { vendorFacebookLogin, vendorGoogleLogin, addToCalender, vendorRegister, vendorLogin, register, clientLogin, refresh, logout, verify, clientGoogleLogin, sendMailForgotPassword, resetpassword, vendorEmailVerify, sendForgetMailToVendor, resetVendorPassword, facebookLogin, GetStreamUserToken, GetStreamVendorToken } = require('../controllers/AuthController')

router.route('/user/stream-token').patch(isUserLoggedin, GetStreamUserToken)
router.route('/vendor/stream-token').patch(isLoggedin, GetStreamVendorToken)
router.route('/user/login').post(clientLogin)
router.route('/user/register').post(register)
router.route('/user/googlelogin').post(clientGoogleLogin)
router.route('/user/facebook/login').post(facebookLogin)
router.route('/user/logout').post(logout)
router.route('/user/verify/:token').patch(verify)
router.route('/user/forget-password/send-mail').patch(sendMailForgotPassword)
router.route('/user/reset-password/:token').patch(resetpassword)
router.route('/google/addToCalender').post(isUserLoggedin, addToCalender)

router.route('/refresh').post(refresh)

router.route('/vendor/register').post(vendorRegister);
router.route('/vendor/login').post(vendorLogin)
router.route('/vendor/googlelogin').post(vendorGoogleLogin)
router.route('/vendor/facebook/login').post(vendorFacebookLogin)
router.route('/vendor/verify/:token').patch(vendorEmailVerify)
router.route('/vendor/forget-password/send-mail').patch(sendForgetMailToVendor)
router.route('/vendor/reset-password/:token').patch(resetVendorPassword)
router.route('/vendor/logout').post(logout)

router.route('/admin/register').post(isUserLoggedin, requiredRole("admin"), vendorRegister);

module.exports = router;
