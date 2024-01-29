
import React, { useState } from 'react';

const VendorNavbar = (props) => {
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
        <img src="images\campus-bazar-high-resolution-logo-transparent.svg" alt="Campus Bazar Logo" className='logo' />
      </div>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
      <br />
      <span><h1>{props.shop}</h1></span>
      <br />
        <span onMouseUp={toggleMenu} className="user-name"><img src="images\user.png" alt="user" className='userimage' /><br />{props.name}</span>
        <ul className='ulinnavbar'>
          <li>Change Password</li>
          <li><span onClick={logout} className="user-name">LogOut</span></li>
        </ul>
      </div>
    </nav>
  );
};

export default VendorNavbar;
