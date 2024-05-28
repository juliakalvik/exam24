import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "./style.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedin = !!localStorage.getItem("token");
  const isVenueManager = localStorage.getItem("venueManager"); 



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Link to="/">Discover</Link>
          {!isLoggedin && <Link to="/register">Register</Link>}
          {isLoggedin ? (
            <>
              <Link to="/userprofile">Profile</Link>
            {isVenueManager && <Link to="/managevenues">Manage venues</Link>}
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
