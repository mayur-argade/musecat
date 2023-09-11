const express = require('express');
const router = express.Router();
const { isLoggedin, isVerified, isUserLoggedin } = require('../middleware/authMiddleware')

const { generateTicket, ticketStatus, getAllTickets, getTicketsByEvent } = require('../controllers/TicketController')

router.route('/ticket/bookticket').post(isUserLoggedin, generateTicket)
router.route('/ticket/:ticketid').get(ticketStatus)
router.route('/getalltickets').get(isLoggedin, isVerified, getAllTickets)
router.route('/vendor/:eventid/tickets').get(isLoggedin, isVerified, getTicketsByEvent)

module.exports = router;
