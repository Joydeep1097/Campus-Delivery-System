// NavbarWithProfile.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarWithProfile = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //console.log(props.name)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to="/">
          <img src="/images/campus-bazar-high-resolution-logo-transparent.svg" alt="logo" className="logo"/>
        </Link>
      </div>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
      <br />
        <span onMouseUp={toggleMenu} className="user-name">{props.name}</span>
        <ul className='ulinnavbar'>
          <li>Orders</li>
          <li>Address</li>
          <li>Change Password</li>
          <li><span onClick={logout} className="user-name">LogOut</span></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
