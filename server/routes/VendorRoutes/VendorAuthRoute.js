const express = require('express');
const router = express.Router();
const { vendorRegister } = require('../../controllers/VendorControllers/VendorAuthController')

router.route('/vendor/register').post(vendorRegister);

module.exports = router;
