import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderPopup from './OrderPopup'; // Import the OrderPopup component

const VendorNavbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOrderPopup, setShowOrderPopup] = useState(false); // State variable for showing the order popup

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const viewOrders = async () => {
    const utoken = localStorage.getItem("token");
    console.log("hiii")
    try {
      const response = await fetch('http://localhost:27017/api/v1/vendor/vendorOrderHistory', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data.orderList); 
      setOrders(data.orderList); // Set the order list in state
      setShowOrderPopup(true); // Show the order popup
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/campus-bazar-high-resolution-logo-transparent.svg" alt="logo" className="logo" />
        </Link>
      </div>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <br />
        <span><h1>{props.shop}</h1></span>
        <br />
        <span onMouseUp={toggleMenu} className="user-name"><img src="images\userwhite.png" alt="user" className='userimage' /><br />{props.name}</span>
        <ul className='ulinnavbar'>
          <li><span onClick={viewOrders} className="user-name">Orders</span></li>
          <li><span onClick={logout} className="user-name">LogOut</span></li>
        </ul>
      </div>
      {showOrderPopup && <OrderPopup orders={orders} onClose={() => setShowOrderPopup(false)} />} {/* Render OrderPopup if showOrderPopup is true */}
    </nav>
  );
};

export default VendorNavbar;
