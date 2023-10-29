const express = require('express');
const router = express.Router();
const passport = require('passport')

const { isLoggedin, isUserLoggedin, requiredRole } = require("../middleware/authMiddleware")

const { vendorRegister, vendorLogin, register, clientLogin, refresh, logout, verify, clientGoogleLogin, sendMailForgotPassword, resetpassword, googleLogin } = require('../controllers/AuthController')

router.route('/vendor/register').post(vendorRegister);
router.route('/vendor/login').post(vendorLogin)

router.route('/user/register').post(register)
router.route('/user/login').post(clientLogin)
router.route('/user/googlelogin').get(passport.authenticate("google", {
    scope: ["profile", "email"]
}), clientGoogleLogin)
router.route('/google/callback').post(googleLogin)

router.route('/refresh').post(refresh)
router.route('/vendor/logout').post(logout)
router.route('/user/logout').post(logout)
router.route('/user/verify/:token').patch(verify)
router.route('/user/forget-password/send-mail').patch(sendMailForgotPassword)
router.route('/user/reset-password').patch(resetpassword)

router.route('/admin/register').post(isUserLoggedin, requiredRole("admin"), vendorRegister);

module.exports = router;
