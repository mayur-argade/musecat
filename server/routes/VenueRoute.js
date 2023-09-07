const express = require('express');
const router = express.Router();

const { createVenue } = require('../controllers/VenueController')

router.route('/create-venue').post(createVenue);


module.exports = router;
