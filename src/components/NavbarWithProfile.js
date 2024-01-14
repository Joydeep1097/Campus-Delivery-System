// NavbarWithProfile.js

import React from 'react';
import { Link } from 'react-router-dom';


const NavbarWithProfile = ({ accountId, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Campus Bazar</Link>
      </div>
      <div className="navbar-items">
        <div className="navbar-profile-info">
          <span>Account ID: {accountId}</span>
          <Link to="/orders">Orders</Link>
        </div>
        <ul>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
