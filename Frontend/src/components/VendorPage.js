// VendorPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import VendorSignup from './VendorSignup';
const VendorPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here using shopId and password
    if (email && password) {
      console.log('Login clicked. Shop ID:', email, 'Password:', password);
      // Replace the console.log with your actual login action
    } else {
      alert('Please enter Shop ID and Password');
    }
  };

  return (
    <div className='outer'>
      <div className='container'>
        <h3>Login</h3>
        {/* Add your login form with event handlers */}
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="button-container">
          <button type="button" className="login-button" onClick={handleLogin}>
            Login
          </button>
          <Link to="/">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
          </div>
        </form>
      

      {/* Registration Section */}
      <div>
        
        <p>Are you new to Campus Bazar? Register now to start selling!</p>
        {/* Link to the registration page */}
        <Link to="/vendorregistration">Register</Link>
      </div>
      </div>
    </div>
  );
};

export default VendorPage;
