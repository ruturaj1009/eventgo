import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const BookEventModal = ({ showModal, setShowModal, eventData, fetchData }) => {
  const { auth } = useContext(AuthContext);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    eventName: "",
    ticketType: "premium",
  });

  useEffect(() => {
    if (auth && auth.user && auth.user.name) {
      setLoggedInUserName(auth.user.name);
    }
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookEvent = () => {
    const { id, ticketPrice, location } = eventData;
    const { username, ticketType } = formData;
    const bookEventData = {
      userId: auth.user.id,
      ticketType,
    };

    axios
      .post(`http://localhost:6060/api/v1/events/book/${id}`, bookEventData)
      .then((response) => {
        setShowModal(false);
            toast.success(response.data.message);
        // toast.success("Event booked successfully!");
        fetchData();
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
              toast.error(error.response.data.message);
          } else if (error.request) {
            toast.error("Something went wrong");
          } else {
            toast.error("Internal server error");
          }
      });
  };

  useEffect(() => {
    if (eventData) {
      setFormData({
        ...formData,
        username: loggedInUserName,
        eventName: eventData.title,
      });
    }
  }, [eventData, loggedInUserName]);

  return (
    <>
      {showModal && <div className="modal-backdrop show"></div>}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Book Event</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "auto" }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={loggedInUserName}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventData.location}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Ticket Price</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventData.ticketPrice}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Ticket Type</label>
                  <select
                    className="form-control"
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleInputChange}
                  >
                    <option value="premium">Premium</option>
                    <option value="regular">Regular</option>
                    <option value="classic">Classic</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleBookEvent}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookEventModal;
