// VendorSignup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopRegistration from './ShopRegistration';
const VendorSignup = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [next,setNext] = useState(0);
  const handleNext = async () => {
    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert('Name must contain only alphabetical characters');
      return;
    }
    if (!/^\d{10}$/.test(mobileNo)) {
      alert('Mobile Number must be 10 digits');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Email must be in the format digits@alphabetical.alphabetical');
      return;
    }
    setNext(1);
  };

  return (
    <div className="outer">
      {next===1?<ShopRegistration name={name} contactNo={mobileNo} contactMail={email} password={password}/>:
      <div className='container'>
        <h1>Signup</h1>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[A-Za-z]+"
            />
          </label>
          <br />
          <label>
            Mobile Number:
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              minLength={10}
              maxLength={10}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          <br />
          <div className="button-container">
            <button type="button" onClick={handleNext}>
              Next
            </button>
            <Link to="/">
              <button type="button" className="back-button">
                Back
              </button>
            </Link>
          </div>

        </form>
      </div>
    }   
    </div>
  );
};


export default VendorSignup;
