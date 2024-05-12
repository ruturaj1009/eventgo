const Event = require("../models/event.model");

exports.createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      image_link,
      location,
      ticketPrice,
      startDate,
      endDate,
      organizer,
    } = req.body;
    if(!title || !description || !location || !ticketPrice || !startDate || !endDate || !organizer) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the fields'
      });
    }
    const event = await Event.create({
      title,
      description,
      imagelink:image_link,
      location,
      ticketPrice,
      startDate,
      endDate,
      organizer,
    });
    if (event) {
      return res.status(201).json({
        success: true,
        message: "Event created successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find().skip(skip).limit(limit).populate({
      path: 'organizer',
      select: 'id name phone'
    });;

    const totalEvents = await Event.countDocuments();
    const totalPages = Math.ceil(totalEvents / limit);

    res.status(200).json({
      success: true,
      data: events,
      page,
      totalPages,
    });
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSearchEvents = async (req, res, next) => {
  try {
    const { query } = req.query;
    const events = await Event.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    }).populate({
      path: 'organizer',
      select: 'id name phone'
    });;
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    next(err);
  }
};

exports.getEventByOrganizerId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.find({ organizer: id }).populate({
      path: 'organizer',
      select: 'id name phone'
    });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    next(err);
  }
};

exports.SearchEventByOrganizerId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { query } = req.query;
    const events = await Event.find({
      organizer: id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    }).populate({
      path: 'organizer',
      select: 'id name phone'
    });
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const id = req.params.id; // Extract the id parameter from req.params
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const {
      title,
      description,
      location,
      ticketPrice,
      startDate,
      endDate,
    } = req.body;
    
    if(!title || !description || !location || !ticketPrice || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the fields'
      });
    }

    const event = await Event.findByIdAndUpdate(eventId, {
      title,
      description,
      location,
      ticketPrice,
      startDate,
      endDate,
    });

    if (event) {
      return res.status(200).json({
        success: true,
        message: "Event updated successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
  } catch (err) {
    next(err);
  }
};


exports.bookTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, ticketType } = req.body;

    // Check if the event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the ticketType is valid
    const validTicketTypes = ['premium', 'regular', 'classic'];
    if (!validTicketTypes.includes(ticketType)) {
      return res.status(400).json({ message: 'Invalid ticket type' });
    }

    // Check if the user has already booked a ticket for this event
    const isUserBooked = event.booked_users.some(
      (bookedUser) => bookedUser.userId.toString() === userId
    );
    if (isUserBooked) {
      return res.status(400).json({ message: 'You have already booked a ticket for this event' });
    }

    // Book the ticket
    const newBookedUser = { userId, ticketType };
    event.booked_users.push(newBookedUser);
    await event.save();

    // Find the ticketId
    const ticket = event.booked_users.find(
      (bookedUser) =>
        bookedUser.userId.toString() === userId &&
        bookedUser.ticketType === ticketType
    );
    const ticketId = ticket._id;

    res.status(200).json({ 
      success:true,
      message: 'Ticket booked successfully', 
      ticketId 
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookedEvents = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find events where the user has booked a ticket
    const bookedEvents = await Event.find({
      'booked_users.userId': userId,
    }).populate({
      path: 'organizer',
      select: 'id name phone'
    });

    if (!bookedEvents || bookedEvents.length === 0) {
      return res.status(404).json({ message: 'No booked events found' });
    }

    res.status(200).json({ events: bookedEvents });
  } catch (error) {
    next(error);
  }
};

