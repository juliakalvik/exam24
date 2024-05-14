import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import "./style.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className='logoname'>HoliDaze </Link>
          <p className='subtext'>...your life</p>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/venues">Venues</Link>
          <Link to="/register">Register</Link>
          <Link to="/cart" className="bordered">Cart</Link>
          <Link to="/login" className="bordered">Login</Link>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMenuOpen ? 'x' : '☰'}
        </div>
      </nav>
    </>
  );
}
