const express = require('express');
const router = express.Router();
const { isLoggedin, isVerified, isUserLoggedin } = require('../middleware/authMiddleware')

const { generateTicket, ticketStatus, getAllTickets, getTicketsByEvent, getTicketIdByEventIduser, updateStatusUsingSessionId , updateStatusOfTicketbyVendor} = require('../controllers/TicketController')

router.route('/ticket/bookticket').post(isUserLoggedin, generateTicket)
router.route('/ticket/:ticketid').get(ticketStatus)
router.route('/getalltickets').get(isLoggedin, isVerified, getAllTickets)
router.route('/update-ticket-status').patch(isLoggedin, isVerified, updateStatusOfTicketbyVendor)
router.route('/vendor/:eventid/tickets').get(isLoggedin, isVerified, getTicketsByEvent)
router.route('/ticket/getticketid').get(isUserLoggedin, getTicketIdByEventIduser)
router.route('/ticket/update-payment-status').patch(isUserLoggedin, updateStatusUsingSessionId)

module.exports = router;
