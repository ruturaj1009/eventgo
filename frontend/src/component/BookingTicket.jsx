import React from "react";
import "./BookingTicket.css";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
const BookingTicket = ({ startDate, title, location, ticketid, ticketType,imagelink }) => {
  const { auth } = React.useContext(AuthContext);
  return (
    <div>
      <div className="ticket ticket-2" style={{backgroundImage:`url(${imagelink})`}}>
        <div className="date">
          <span className="day">
            {moment(startDate).utcOffset("+05:30").format("Do")}
          </span>
          <span className="month-and-time">
            {moment(startDate).utcOffset("+05:30").format("MMM YYYY")}
            <br />
            <span className="small">
              {moment(startDate).utcOffset("+05:30").format("HH:MM A")}
            </span>
          </span>
        </div>
        <div className="artist">
          <span className="name">{auth?.user.name}</span>
          <br />
          <span className="live small">{ticketType}</span>
        </div>
        <div className="location">
          <span>{title}</span>
          <br />
          <span className="small">
          <i className="fas fa-map-marker-alt mr-1"></i>
            <span>{location}</span>
          </span>
        </div>
        <div className="rip"></div>
        <div className="cta">
          <button className="buy" href="#">
            {ticketid}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;
