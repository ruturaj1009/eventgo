import React, { useState } from "react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import BookEventModal from "./BookEventModal";

const EventCard = ({
  id,
  title,
  description,
  location,
  startDate,
  endDate,
  imagelink,
  ticketPrice,
  organizerId,
  organizer,
  contact,
  people
}) => {
  const { auth } = React.useContext(AuthContext);
  const currentUser = auth?.user.id;
  const isExpired = moment(endDate).isSameOrAfter(moment());
  const sameUser = currentUser === organizerId || endDate <= Date.now();
  
  const [showBookModal, setShowBookModal] = useState(false);

  const handleShowBookModal = () => {
    setShowBookModal(true);
  };

  return (
    <div
      className="col-sm-12 col-md-6 col-lg-4 mb-4"
    >
      <div
        className="card text-white card-has-bg click-col"
        style={{
          backgroundImage: `url(${imagelink})`,
        }}
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
              {moment(endDate).utcOffset("+05:30").format("Do MMM YYYY h:mm A")}
            </small>
          </div>
          <div
            className="card-footer d-flex flex-column"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <small className="mb-2" style={{ fontSize: "20px" }}>
              <i className="fa-solid fa-dollar"></i> {ticketPrice}
            </small>
            {!sameUser && isExpired && (
              <button type="button" className="btn btn-primary"  onClick={handleShowBookModal}>
                <i className="fa-solid fa-ticket"></i> Book Now
              </button>
            )}
          </div>
        </div>
      </div>
      <BookEventModal
        showModal={showBookModal}
        setShowModal={setShowBookModal}
        eventData={{
          id,
          title,
          description,
          location,
          startDate,
          endDate,
          imagelink,
          ticketPrice,
          organizerId,
          organizer,
          contact
        }}
        fetchData={() => {}}
      />
    </div>
  );
};

export default EventCard;
