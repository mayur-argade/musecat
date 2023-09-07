const express = require('express');
const router = express.Router();

const { createVenue, getVenueDetails } = require('../controllers/VenueController')

router.route('/create-venue').post(createVenue);
router.route('/:venue').get(getVenueDetails)


module.exports = router;
