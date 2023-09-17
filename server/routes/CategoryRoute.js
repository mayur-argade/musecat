const express = require('express');
const router = express.Router();

const { getCategories, getCategoryAllEvents, createCategory, getAllCategories, getCategoriesWithEvents } = require('../controllers/CategoryController')

router.route('/').get(getCategories);
router.route('/all').get(getAllCategories)
router.route('/create-category').post(createCategory)
router.route('/eventcounts').get(getCategoriesWithEvents)
router.route('/:categoryname').get(getCategoryAllEvents)



module.exports = router;
