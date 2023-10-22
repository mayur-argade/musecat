const express = require('express');
const router = express.Router();
const { isLoggedin, isUserLoggedin, isVerified, requiredRole } = require('../middleware/authMiddleware')


const { createEvent, getEventById, getVendorAllEventsNOffers, createOffer, updateEvent, addToFavorites, getUpcomingEvents, customQue, getAllOffers, deleteEvent, deleteOffer , getTrendingEvents} = require('../controllers/EventController')

router.route('/vendor/create-event').post(isLoggedin, isVerified, createEvent);
router.route('/event/:eventid').get(getEventById)
router.route('/vendor/events').get(isLoggedin, isVerified, getVendorAllEventsNOffers)
router.route('/vendor/create-offer').post(isLoggedin, isVerified, createOffer)
router.route('/vendor/event/update-event').patch(isLoggedin, isVerified, updateEvent)

router.route('/event/like').put(isUserLoggedin, addToFavorites)
router.route('/events/upcoming-events').get(getUpcomingEvents)
router.route('/event/:eventid/customq').get(customQue)
router.route('/offers/').get(getAllOffers)
router.route('/trending-events').get(getTrendingEvents)

router.route('/admin/create-event').post(isUserLoggedin, requiredRole("admin"), createEvent);
router.route('/admin/create-offer').post(isUserLoggedin, requiredRole("admin"), createOffer)
router.route('/admin/delete-event').delete(deleteEvent)
router.route('/admin/delete-offer').delete(deleteOffer)

module.exports = router;
