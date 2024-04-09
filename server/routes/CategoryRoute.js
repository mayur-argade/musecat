const express = require('express');
const router = express.Router();

const { getCategories, getCategoryAllEvents, getCategoryAllEvents2, createCategory, getAllCategories, getCategoriesWithEvents, updateCategory, deleteCategory } = require('../controllers/CategoryController')


router.route('/all').get(getAllCategories)
router.route('/create-category').post(createCategory)
router.route('/update-category').put(updateCategory)
router.route('/delete-category').delete(deleteCategory)
router.route('/eventcounts').get(getCategoriesWithEvents)
router.route('/:categoryname').post(getCategoryAllEvents2)



module.exports = router;
