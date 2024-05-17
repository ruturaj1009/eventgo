const express = require('express');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

//event
router.post('/', authMiddleware.authenticate ,eventController.createEvent);
router.get('/', authMiddleware.authenticate ,eventController.getEvents);
router.get('/id/:id', authMiddleware.authenticate ,eventController.getEventById);
router.get('/search', authMiddleware.authenticate ,eventController.getSearchEvents);
router.delete('/delete/:id', authMiddleware.authenticate ,eventController.deleteEvent);
router.put('/update/:id', authMiddleware.authenticate ,eventController.updateEvent);

router.get('/oid/:id', authMiddleware.authenticate ,eventController.getEventByOrganizerId);
router.get('/oid/search/:id', authMiddleware.authenticate ,eventController.SearchEventByOrganizerId);

//booking
router.post('/book/:id', authMiddleware.authenticate ,eventController.bookTicket);
router.get('/booking/:userId', authMiddleware.authenticate ,eventController.getBookedEvents);


module.exports = router;