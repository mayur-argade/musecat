const express = require('express');
const router = express.Router();

const { getCategories, getCategoryAllEvents } = require('../controllers/CategoryController')

router.route('/').get(getCategories);
router.route('/:categoryname').get(getCategoryAllEvents)



module.exports = router;
