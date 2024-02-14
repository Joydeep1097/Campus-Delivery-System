// NavbarWithProfile.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserOrderPopup from './UserOrderPopup';

const NavbarWithProfile = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
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
        const response = await fetch('http://43.204.192.134:27017/api/v1/orderHistory', {
            method: 'POST',
            headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data.orders);
        setOrders(data.orders); // Set the order list in state
        setShowOrderPopup(true); 
    } catch (error) {
      console.error('Error fetching orders:', error);
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
      {showOrderPopup && <UserOrderPopup orders={orders} onClose={() => setShowOrderPopup(false)} />} {/* Render OrderPopup if showOrderPopup is true */}
    </nav>
  );
};

export default NavbarWithProfile;
