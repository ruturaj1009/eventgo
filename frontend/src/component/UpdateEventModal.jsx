import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateEventModal = ({ showModal, setShowModal, fetchData, eventId }) => {
  const [formData, setFormData] = useState({
    title: "",
    ticketPrice: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateEvent = () => {
    axios
      .put(`http://localhost:6060/api/v1/events/update/${eventId}`, formData)
      .then((response) => {
        toast.success("Event updated successfully");
        setShowModal(false);
        fetchData();
      })
      .catch((error) => {
        toast.error("Failed to update event");
        console.error(error);
      });
  };

  useEffect(() => {
    if (eventId) {
      axios
        .get(`http://localhost:6060/api/v1/events/id/${eventId}`)
        .then((response) => {
          const eventData = response.data.data;
          setFormData({
            title: eventData.title,
            ticketPrice: eventData.ticketPrice,
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            location: eventData.location,
          });
        })
        .catch((error) => {
          toast.error("Failed to fetch event details");
          console.error(error);
        });
    }
  }, [eventId]);

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
              <h5 className="modal-title">Update Event</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "auto" }}
              >
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Ticket Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Start Date and Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date and Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
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
                onClick={handleUpdateEvent}
                disabled={
                  !formData.title ||
                  !formData.startDate ||
                  !formData.endDate ||
                  !formData.location
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEventModal;