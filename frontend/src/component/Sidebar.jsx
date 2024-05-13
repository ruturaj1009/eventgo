import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const {auth,setAuth, setLoggedin} = React.useContext(AuthContext);

  const handleLogout=()=>{
    toast.success("Logged out Successfully")
    localStorage.removeItem("authdata");
    navigate("/login");
    setLoggedin(false);
    setAuth({
      ...auth,
      user:"",
      token:""
    })
  }
  return (
    <>
      <nav
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse bg-white"
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <NavLink
              to="/dashboard"
              className="list-group-item list-group-item-action py-3 ripple "
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/events"
              className="list-group-item list-group-item-action py-3 ripple "
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span>My Events</span>
            </NavLink>
            <NavLink
              to="/bookings"
              className="list-group-item list-group-item-action py-3 ripple"
            >
              <i className="fas fa-chart-line fa-fw me-3"></i>
              <span>My Bookings</span>
            </NavLink>
            <NavLink
              to="/contact"
              className="list-group-item list-group-item-action py-3 ripple"
            >
              <i className="fas fa-chart-pie fa-fw me-3"></i>
              <span>Contact us</span>
            </NavLink>
            <a
              onClick={() => handleLogout()}
              className="list-group-item list-group-item-action py-3 ripple"
            >
              <i className="fas fa-lock fa-fw me-3"></i>
              <span>Log out </span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
