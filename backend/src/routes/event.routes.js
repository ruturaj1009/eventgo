const express = require('express');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

//event
router.post('/',  eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/id/:id', eventController.getEventById);
router.get('/search', eventController.getSearchEvents);
router.delete('/delete/:id', eventController.deleteEvent);
router.put('/update/:id', eventController.updateEvent);

router.get('/oid/:id', eventController.getEventByOrganizerId);
router.get('/oid/search/:id', eventController.SearchEventByOrganizerId);

//booking
router.post('/book/:id', eventController.bookTicket);
router.get('/booking/:userId', eventController.getBookedEvents);


module.exports = router;