import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyEventCard from "./MyEventCard";
import moment from "moment";
import CreateEventModal from "./CreateEventModal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { auth,loggedin } = useContext(AuthContext);

  // console.log(auth)

  const fetchData = (query = "") => {
    if(!auth.user){
      return;
    }
    const userId = auth?.user?.id;
    const url = query
      ? `http://localhost:6060/api/v1/events/oid/search/${userId}?query=${query}`
      : `http://localhost:6060/api/v1/events/oid/${userId}`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setEvents(res?.data.data);
        if (res.data.data.length === 0) {
          toast.warning("No events found");
        }
      })
      .catch((error) => {
        setLoading(false);
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
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchData(e.target.value);
  };

  const filteredEvents = () => {
    switch (activeTab) {
      case "upcoming":
        return events.filter((event) => {
          const startDate = moment(event.startDate);
          return startDate.isValid() && startDate.isAfter(moment());
        });
      case "ongoing":
        return events.filter((event) => {
          const startDate = moment(event.startDate);
          const endDate = moment(event.endDate);
          return (
            startDate.isValid() &&
            endDate.isValid() &&
            startDate.isSameOrBefore(moment()) &&
            endDate.isSameOrAfter(moment())
          );
        });
      case "past":
        return events.filter((event) => {
          const endDate = moment(event.endDate);
          return endDate.isValid() && endDate.isBefore(moment());
        });
      default:
        return events;
    }
  };

  return (
    <>
      <section className="wrapper dashboard">
        <div className="container">
          {/* Header */}
          <div className="row">
            <div className="col text-center mb-3">
              <h3 className="mt-0">Created Events</h3>
            </div>
          </div>
          {/* Search and Create Event Button */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="col text-right">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Create Event
              </button>
            </div>
          </div>
          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "upcoming" ? "active" : ""
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "ongoing" ? "active" : ""
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "past" ? "active" : ""}`}
                onClick={() => setActiveTab("past")}
              >
                Past
              </button>
            </li>
          </ul>
          {/* No Data Found Message */}
          {filteredEvents().length === 0 && (
            <div className="row">
              <div className="col text-center">
                <p>No data found</p>
              </div>
            </div>
          )}
          {/* Event Cards */}
          <div className="row">
            {filteredEvents().map((data) => (
              <MyEventCard
                key={data._id}
                id={data._id}
                title={data.title}
                description={data.description}
                location={data.location}
                startDate={data.startDate}
                endDate={data.endDate}
                imagelink={data.imagelink}
                ticketPrice={data.ticketPrice}
                organizer={data.organizer.name}
                contact={data.organizer.phone}
                people={data.booked_users.length}
                fetchData={fetchData}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CreateEventModal */}
      <CreateEventModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
      />
    </>
  );
};

export default MyEvents;
