import React from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import "./style.css";
import { fetchProfileByName } from "../../lib/api";
import { useEffect } from "react";
const userName = localStorage.getItem("name");
  

const fetchData = async () => {
  try {
    const data = await fetchProfileByName(userName);
    setProfile(data);

    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const options = updateOptions(getOptions);
    
    
    localStorage.setItem("avatar", data.avatar);
  } catch (error) {
    console.error("Error fetching listing details:", error);
  }
}

const ToggleAdmin = () => {
  return (
    <>
      <div className="parent">
        <div className="manage">
          <h2>Welcome back, {userName}</h2>
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
