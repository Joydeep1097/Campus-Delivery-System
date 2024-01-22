
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="quicklinks">
        <Link to="https://www.iitbhilai.ac.in/index.php?pid=aca_ourcampus">Our Campus</Link>
        <Link to="/campus-map">Campus Map</Link>
        <Link to="/aboutus">About Us</Link>
      </div>
      <div>
        <Link to="/">
          <img src="/images/campus-bazar-high-resolution-logo-transparent.svg" alt="logo" className="logo"/>
        </Link>
      </div>
      {/*<div className="search-bar"> 
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </div>*/}
      <div className="auth-options">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/Vendor">Vendor</Link>
      </div>
    </nav>
  );
};

export default Navbar;
