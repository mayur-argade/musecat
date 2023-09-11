const express = require('express');
const router = express.Router();
const { isLoggedin, isUserLoggedin, isVerified } = require('../middleware/authMiddleware')


const { createEvent, getEventById, getVendorAllEventsNOffers, createOffer, updateEvent, addToFavorites, getUpcomingEvents, customQue, getAllOffers } = require('../controllers/EventController')

router.route('/vendor/create-event').post(isLoggedin, isVerified, createEvent);
router.route('/event/:eventid').get(getEventById)
router.route('/vendor/events').get(isLoggedin, isVerified, getVendorAllEventsNOffers)
router.route('/vendor/create-offer').post(isLoggedin, isVerified, createOffer)
router.route('/vendor/event/:eventid').patch(isLoggedin, isVerified, updateEvent)

router.route('/event/like/:eventid').put(isUserLoggedin, addToFavorites)
router.route('/events/upcoming-events').get(getUpcomingEvents)
router.route('/event/:eventid/customq').get(customQue)
router.route('/offers/').get(getAllOffers)


module.exports = router;
