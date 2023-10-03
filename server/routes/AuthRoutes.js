const express = require('express');
const router = express.Router();

const { isLoggedin, isUserLoggedin, requiredRole } = require("../middleware/authMiddleware")

const { vendorRegister, vendorLogin, register, clientLogin, refresh, logout } = require('../controllers/AuthController')

router.route('/vendor/register').post(vendorRegister);
router.route('/vendor/login').post(vendorLogin)
router.route('/user/register').post(register)
router.route('/user/login').post(clientLogin)
router.route('/refresh').post(refresh)
router.route('/vendor/logout').post(isLoggedin, logout)
router.route('/user/logout').post(isUserLoggedin, logout)

router.route('/admin/register').post(isUserLoggedin, requiredRole("admin"), vendorRegister);


module.exports = router;
