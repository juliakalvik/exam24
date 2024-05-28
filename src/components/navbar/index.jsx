import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import ToggleAdmin from "../toggle"; // Import the toggle component
import "./style.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State to control profile dropdown visibility
  const isLoggedin = !!localStorage.getItem("token");
  const isVenueManager = localStorage.getItem("venueManager") === "true"; // Check if the user is a venue manager


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logoname">
            HoliDaze{" "}
          </Link>
          <p className="subtext">...your life</p>
        </div>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/">Venues</Link>
          {!isLoggedin && <Link to="/register">Register</Link>}
          {isLoggedin ? (
            <>
              <div className="profile-dropdown">
                <button onClick={toggleProfileDropdown}>
                  Profile
                  {showProfileDropdown && (
                    <div className="dropdown-content">
                      <Link to="/userprofile">Profile</Link>
                      {!isVenueManager && (
                        <Link to="/managevenues">Manage Venues</Link>
                      )}
                    </div>
                  )}
                </button>
              </div>
              <Link
                to="/login"
                onClick={() => localStorage.clear()}
                className="bordered"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="bordered">
              Login
            </Link>
          )}
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMenuOpen ? "x" : "☰"}
        </div>
      </nav>
    </>
  );
}
