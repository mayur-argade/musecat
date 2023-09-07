const express = require('express');
const router = express.Router();

const { vendorRegister, vendorLogin, clientRegister, clientLogin } = require('../controllers/AuthController')

router.route('/vendor/register').post(vendorRegister);
router.route('/vendor/login').post(vendorLogin)
router.route('/user/register').post(clientRegister)
router.route('/user/login').post(clientLogin)


module.exports = router;
