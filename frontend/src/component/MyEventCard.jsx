import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateEventModal from "./UpdateEventModal";

const MyEventCard = ({
  id,
  title,
  description,
  location,
  startDate,
  endDate,
  imagelink,
  ticketPrice,
  organizer,
  contact,
  fetchData,
  people,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:6060/api/v1/events/delete/${id}`)
      .then((response) => {
        toast.success("Event deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete event");
      });
  };

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div
          className="card text-white card-has-bg click-col"
          style={{ backgroundImage: `url(${imagelink})`, height: "300px" }} // Adjust height here
        >
          <div className="card-img-overlay d-flex flex-column">
            <div className="card-body">
              <h4 className="card-title mt-0 ">
                <a className="text-white">{title}</a>
              </h4>
              <h5 className="mt-0" style={{ textDecoration: "none" }}>
                <p className="text-white">{description}</p>
              </h5>
              <small className="card-meta mb-2">
                <i className="fas fa-map-marker-alt mr-1"></i> {location}
              </small>
              <br />
              <small className="card-meta mb-2">
                <i className="fas fa-user"></i> {organizer}
              </small>
              <br />
              <small className="card-meta mb-2">
                <i className="fas fa-phone-alt"></i> {contact}
              </small>
              <br />
              <small className="card-meta mb-2">
                <i className="fa-solid fa-user-group"></i> {people}
              </small>
              <br />
              <small>
                <i className="far fa-clock"></i>{" "}
                {moment(startDate)
                  .utcOffset("+05:30")
                  .format("Do MMM YYYY h:mm A")}
                {" to "}
                {moment(endDate)
                  .utcOffset("+05:30")
                  .format("Do MMM YYYY h:mm A")}
              </small>
            </div>
            <div
              className="card-footer d-flex flex-column"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <small className="mb-2" style={{ fontSize: "20px" }}>
                <i className="fa-solid fa-dollar"></i> {ticketPrice}
              </small>
              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  style={{ margin: "5px", maxHeight: "45px" }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  style={{ margin: "5px", maxHeight: "45px" }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <UpdateEventModal
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
          eventId={id}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

export default MyEventCard;
