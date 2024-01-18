// NavbarWithProfile.js

import React, { useState } from 'react';
import Cart from './Cart';

const NavbarWithProfile = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="images\campus-bazar-high-resolution-logo-transparent.svg" alt="Campus Bazar Logo" className='logo' />
      </div>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
      <Cart/>
        <button onClick={toggleMenu}><span className="user-name">🙍‍♂️{props.id}</span></button>
        <ul className='ulinnavbar'>
          <li>Orders</li>
          <li>Address</li>
          <li>Change Password</li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
