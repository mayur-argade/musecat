const express = require('express');
const router = express.Router();

const { isLoggedin, isVerified } = require('../middleware/authMiddleware')
const { createPopup, editPopup, getPopup, showModalTrigger } = require('../controllers/PopupController')

router.route('/admin/popup/create-popup').post(createPopup)
router.route('/admin/popup/edit-popup').put(editPopup)
router.route('/admin/popup/edit-view-popup').put(showModalTrigger)
router.route('/admin/popup/get-popup/:id').get(getPopup)

module.exports = router;
