import React from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import "./style.css";

const ToggleAdmin = () => {
  return (
    <>
    <div className="parent">
        <h2>Admin dashboard</h2>
      </div>
      <div className="manage">
        <h5>Manage:</h5>
        <h5>Manage:</h5>
      </div>
    <div className="toggle">
      <Link to="/hostprofile">
        <h3>Profile</h3>
      </Link>
      <Link to="/managevenues">
        <h3>Venues</h3>
      </Link>
    </div>
    
    </>
  );
};

export default ToggleAdmin;
