const express = require('express');
const router = express.Router();
const multer = require('multer');

// Define the storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});

// Create the multer instance with the defined storage
const upload = multer({ storage: storage });

const { isLoggedin, isUserLoggedin, isVerified, requiredRole } = require('../middleware/authMiddleware')


const { createEvent, getEventById, getVendorAllEventsNOffers, getVendorAllEvents, createOffer, updateEvent, addToFavorites, getUpcomingEvents, customQue, getAllOffers, deleteEvent, deleteOffer, getTrendingEvents, getEventsForAdmin, getOffersForAdmin, adminVerifyEvent, VendorUnverifiedListings } = require('../controllers/EventController')

router.route('/vendor/create-event').post(upload.any(), isLoggedin, isVerified, createEvent);
router.route('/event/:eventid').get(getEventById)
router.route('/vendor/events').get(isLoggedin, isVerified, getVendorAllEventsNOffers)
router.route('/vendor/create-offer').post(isLoggedin, isVerified, createOffer)
router.route('/vendor/event/update-event').patch(isLoggedin, isVerified, updateEvent)
router.route('/vendor/listing/unverified').get(isLoggedin, isVerified, VendorUnverifiedListings)

router.route('/event/like').put(isUserLoggedin, addToFavorites)
router.route('/events/upcoming-events').get(getUpcomingEvents)
router.route('/event/:eventid/customq').get(customQue)
router.route('/offers/').get(getAllOffers)
router.route('/trending-events').get(getTrendingEvents)

router.route('/admin/create-event').post(isUserLoggedin, requiredRole("admin"), createEvent);
router.route('/admin/create-offer').post(isUserLoggedin, requiredRole("admin"), createOffer)
router.route('/admin/delete-event').delete(deleteEvent)
router.route('/admin/delete-offer').delete(deleteOffer)
router.route('/admin/:vendorid/allevents').get(getVendorAllEvents)
router.route('/admin/getAllEvents').get(getEventsForAdmin)
router.route('/admin/getAlloffers').get(getOffersForAdmin)
router.route('/admin/verify-event').patch(adminVerifyEvent)
module.exports = router;
