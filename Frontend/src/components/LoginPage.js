// LoginPage.js

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setflag] = useState('');
  const [name,setName] = useState('');
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setflag(localStorage.getItem('token'));
      setName(localStorage.getItem('name'));
    }
  },[]);
  const handleLogin = async () => {
    // ValEmailate Email format (same as during signup)
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Email must be in the format digits@alphabetical.alphabetical');
      return;}

    // Implement login logic here
    //console.log(name);
    //console.log('Password:', password);
    //setflag(1);

    try {
      // Make a POST request to the backend API
      const data = {
        "contactMail": email,
        "password": password

      }
      //console.log(JSON.stringify(data));
      const response = await fetch('http://localhost:27017/api/v1/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
    if(result.success===true){
      localStorage.setItem('token',result.token);
      localStorage.setItem('name',result.user.name);
      setflag(result.token);
      setName(result.user.name)
      alert("welcome:"+result.user.name);
    }
    
    } catch (error) {
      // Handle errors (show an error message to the user)
      console.error(error.response.data);
    }
  };

  return (
    <div>
    {flag!==''?<UserProfile name={name}/>:
    <div className="outer">
    <div className='container'>
      <h1>Login</h1>
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
    </div>
    </div>
  }
  </div>
  );
};

export default LoginPage;
