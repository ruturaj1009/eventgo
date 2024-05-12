import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const {auth} = React.useContext(AuthContext);
  useEffect(()=>{
    if(!auth.user){
      navigate("/login");
    }
  },[auth.user])
  if(!auth.user){
    return;
  }
  const name = auth.user.name;
  return (
    <>
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top myNavv"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <Link
            className="navbar-brand d-flex align-items-center justify-content-center"
            to="/"
          >
            <i className="fa-solid fa-calendar" style={{fontSize:"30px",marginRight:"10px"}}></i>
            <h2>Event Go</h2>
          </Link>
          <ul className="navbar-nav ms-auto d-flex flex-row">
            <h6 style={{marginTop:"10px",marginRight:"10px"}}>Hello {name}</h6>
            <img
              src="https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67044.jpg"
              className="rounded-circle"
              height="40"
              alt="Avatar"
              loading="lazy"
            />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
