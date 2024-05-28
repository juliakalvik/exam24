import React from "react";
import { Link } from "@tanstack/react-router";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className="footer-info">
        <p>&copy; 2024 HoliDaze</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
