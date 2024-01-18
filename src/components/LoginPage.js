// LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
const LoginPage = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setflag] = useState(0);
  const handleLogin = () => {
    // Validate ID format (same as during signup)
    if (!/^\d{8}$/.test(id)) {
      alert('ID must be 8 digits');
      return;
    }

    // Implement login logic here
    console.log('ID:', id);
    console.log('Password:', password);
    setflag(1);
  };

  return (
    <div>
    {flag===1?<UserProfile id={id}/>:
    <div className="outer">
    <div className='container'>
      <h1>Login</h1>
      <form>
        <label>
          ID Number:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            maxLength={8}
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
    </div>
    </div>
  }
  </div>
  );
};

export default LoginPage;
