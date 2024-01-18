// NavbarWithProfile.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const NavbarWithProfile = ({ accountId, orders, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Perform additional actions based on the selected option
    // For example, you can navigate to a specific page or trigger a function
    console.log('Selected option:', selectedOption);
  };

  return (
    <nav className="navbar1">
      <div className="navbar1-logo">
        <Link to="/">Campus Bazar</Link>
      </div>
      <div className="navbar1-items">
        
        <div className="navbar1-profile-options">
          <h3>
            Options
            <button className="toggle-btn" onClick={toggleDropdown}>
              {isDropdownOpen ? 'Hide' : 'Show'}
            </button>
          </h3>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => handleOptionChange('View Orders')}>View Orders</button>
              </li>
              <li>
                <button onClick={() => handleOptionChange('Update Address')}>Update Address</button>
              </li>
              <li>
                <button onClick={() => handleOptionChange('Change Password')}>Change Password</button>
              </li>
            </ul>
          )}
        </div>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
