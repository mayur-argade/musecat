const express = require('express');
const router = express.Router();
const { isLoggedin, isUserLoggedin, isVerified } = require('../middleware/authMiddleware')


const { createEvent, getEventById, getVendorAllEventsNOffers, createOffer, updateEvent, addToFavorites, getUpcomingEvents } = require('../controllers/EventController')

router.route('/vendor/create-event').post(isLoggedin, isVerified, createEvent);
router.route('/event/:eventid').get(getEventById)
router.route('/vendor/events').get(isLoggedin, isVerified, getVendorAllEventsNOffers)
router.route('/vendor/create-offer').post(isLoggedin, isVerified, createOffer)
router.route('/vendor/event/:eventid').patch(isLoggedin, isVerified, updateEvent)

router.route('/event/like/:eventid').put(isUserLoggedin, addToFavorites)
router.route('/getUpcomingEvent').get(getUpcomingEvents)

module.exports = router;
