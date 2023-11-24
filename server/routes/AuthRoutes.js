const express = require('express');
const router = express.Router();
const passport = require('passport')

const { isLoggedin, isUserLoggedin, requiredRole } = require("../middleware/authMiddleware")

const { vendorRegister, vendorLogin, register, clientLogin, refresh, logout, verify, clientGoogleLogin, sendMailForgotPassword, resetpassword, googleLogin, vendorEmailVerify, sendForgetMailToVendor, resetVendorPassword } = require('../controllers/AuthController')

router.route('/vendor/register').post(vendorRegister);
router.route('/vendor/login').post(vendorLogin)

router.route('/user/register').post(register)
router.route('/user/login').post(clientLogin)
router.route('/user/googlelogin').get(passport.authenticate("google", {
    scope: ["profile", "email"]
}), clientGoogleLogin)
router.route('/google/callback').post(googleLogin)

router.route('/vendor/verify/:token').patch(vendorEmailVerify)
router.route('/refresh').post(refresh)
router.route('/vendor/logout').post(logout)
router.route('/user/logout').post(logout)
router.route('/user/verify/:token').patch(verify)
router.route('/user/forget-password/send-mail').patch(sendMailForgotPassword)
router.route('/vendor/forget-password/send-mail').patch(sendForgetMailToVendor)
router.route('/user/reset-password/:token').patch(resetpassword)
router.route('/vendor/reset-password/:token').patch(resetVendorPassword)
router.route('/admin/register').post(isUserLoggedin, requiredRole("admin"), vendorRegister);

module.exports = router;
