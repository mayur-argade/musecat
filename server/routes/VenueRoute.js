const express = require('express');
const router = express.Router();

const { createVenue, getVenueDetails, getAllVenues } = require('../controllers/VenueController')

router.route('/create-venue').post(createVenue);
router.route('/venues/all').get(getAllVenues)
router.route('/:venueid').get(getVenueDetails)


module.exports = router;
