const express = require('express');
const router = express.Router();

const { createVenue, getVenueDetails, getAllVenues, getAllVenuesAdmin } = require('../controllers/VenueController')

router.route('/create-venue').post(createVenue);
router.route('/venues/all').get(getAllVenues)
router.route('/:venueid').get(getVenueDetails)
router.route('/admin/getAllVenues').get(getAllVenuesAdmin)

module.exports = router;
