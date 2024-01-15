// NavbarWithProfile.js

import React from 'react';
import { Link } from 'react-router-dom';


const NavbarWithProfile = ({ accountId, onLogout }) => {
  return (
    <nav className="navbar1">
      <div className="navbar1-logo">
        <Link to="/">Campus Bazar</Link>
      </div>
      <div className="navbar1-items">
        <div className="navbar1-profile-info">
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
