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
  const showorders = async () => {
    const utoken = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:27017/api/v1/orderHistory', {
            method: 'GET',
            headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
            alert("Product deleted");
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
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
          <li><span onClick={showorders} className="user-name">Order History</span></li>
          <li><span onClick={logout} className="user-name">LogOut</span></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarWithProfile;
