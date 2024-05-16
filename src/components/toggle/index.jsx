import React from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import "./style.css";

const ToggleAdmin = () => {
  return (
    <>
      <div className="parent">
        <div className="manage">
          <h2>USERNAME</h2>
          <h3>Manage:</h3>
          <div className="toggle">
            <Link to="/hostprofile">
              <h3>Profile</h3>
            </Link>
            <Link to="/managevenues">
              <h3>Venues</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToggleAdmin;
