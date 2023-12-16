const express = require('express');
const router = express.Router();

const { createVenue, getVenueDetails, getAllVenues, deleteVenue, getAllVenuesAdmin, AdminVerifyVenue, editVenue } = require('../controllers/VenueController')
const {isLoggedin, isVerified } = require('../middleware/authMiddleware')

router.route('/create-venue').post(isLoggedin, isVerified, createVenue);
router.route('/venues/all').get(isLoggedin, isVerified, getAllVenues)
router.route('/:venueid').get(getVenueDetails)
router.route('/admin/getAllVenues').get(getAllVenuesAdmin)
router.route('/admin/verify-venue').patch(AdminVerifyVenue)
router.route('/admin/delete-venue').delete(deleteVenue)
router.route('/admin/edit-venue').patch(editVenue)

module.exports = router;
