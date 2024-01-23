// VendorSignup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const VendorSignup = () => {
  const [shopId, setShopId] = useState('');
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to the server)
    console.log('Form submitted:', { shopId, shopName, ownerName, contactNo, email, password });
  };

  return (
    <div className='outer'>
      <div className='container'>
      <h2>Vendor Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Shop ID:
          <input type="text" value={shopId} onChange={(e) => setShopId(e.target.value)} />
        </label>
        <br />
        <label>
          Shop Name:
          <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} />
        </label>
        <br />
        <label>
          Owner Name:
          <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </label>
        <br />
        <label>
          Contact Number:
          <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <div className="button-container">
        <button type="button" onClick={handleSubmit}>
          Signup
        </button>
        <Link to="/vendor">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default VendorSignup;
