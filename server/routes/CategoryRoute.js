const express = require('express');
const router = express.Router();

const { getCategories, getCategoryAllEvents, createCategory, getAllCategories, getCategoriesWithEvents, updateCategory, deleteCategory } = require('../controllers/CategoryController')


router.route('/all').get(getAllCategories)
router.route('/create-category').post(createCategory)
router.route('/update-category').put(updateCategory)
router.route('/delete-category').delete(deleteCategory)
router.route('/eventcounts').get(getCategoriesWithEvents)
router.route('/:categoryname').get(getCategoryAllEvents)



module.exports = router;
