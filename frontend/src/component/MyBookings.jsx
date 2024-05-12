import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import BookingTicket from "./BookingTicket";

const MyBookings = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);

  const fetchBookedEvents = () => {
    if (!auth.user) {
      return;
    }
    const userId = auth?.user?.id;
    setLoading(true);
    axios
      .get(`http://localhost:6060/api/v1/events/booking/${userId}`)
      .then((res) => {
        setLoading(false);
        setBookedEvents(res?.data.events);
        if (res.data.events.length === 0) {
          toast.warning("No booked events found");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to fetch booked events");
        }
      });
  };

  useEffect(() => {
    fetchBookedEvents();
  }, []);

  const getTicketIdByUserId = (bookedUsers, userId) => {
    for (let i = 0; i < bookedUsers.length; i++) {
        if (bookedUsers[i].userId === userId) {
            return bookedUsers[i]._id+" "+bookedUsers[i].ticketType;
        }
    }
    return null; 
};

  return (
    <>
      <section className="wrapper dashboard">
        <div className="container">
          <div className="row">
            <div className="col text-center mb-3">
              <h3 className="mt-0">My Bookings</h3>
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {bookedEvents.length === 0 && !loading && (
            <div className="row">
              <div className="col text-center">
                <p>No booked events found</p>
              </div>
            </div>
          )}
          <div className="row">
            {bookedEvents.map((event) => (
              <BookingTicket
                key={event._id}
                id={event._id}
                title={event.title}
                location={event.location}
                startDate={event.startDate}
                imagelink={event.imagelink}
                ticketPrice={event.ticketPrice}
                organizer={event.organizer.name}
                contact={event.organizer.phone}
                ticketid={getTicketIdByUserId(event.booked_users,auth?.user.id).split(' ')[0]}
                ticketType={getTicketIdByUserId(event.booked_users,auth?.user.id).split(' ')[1]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyBookings;
