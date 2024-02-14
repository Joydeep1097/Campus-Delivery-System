// VendorPage.js

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import VendorSignup from './VendorSignup';
import VendorHomePage from './VendorHomepage';
const VendorPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setflag] = useState('');
  const [name,setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  useEffect(()=>{
    const validate = async () => {
      if (localStorage.getItem('token')) {
        const utoken = localStorage.getItem("token");
        try {
          
          const response = await fetch('http://43.204.192.134:27017/api/v1/vendor/validateTokenVendor', {
            method: 'GET',
            headers: { Authorization: `Bearer ${utoken}` }
          });
          const data = await response.json();
          console.log(data)
          if(data.success==true){
            setflag(localStorage.getItem('token'));
          setName(localStorage.getItem('name'));
          }
        }
        catch (error) {
          console.error('Error fetching shops:', error);
        } finally {
          //setLoading(false);
        }
      };
      
    }
    validate();
  },[]);
  const handleLogin = async () => {
    // Add your login logic here using shopId and password
    if (email && password) {
      console.log('Login clicked. Shop ID:', email, 'Password:', password);
      // Replace the console.log with your actual login action
    } else {
      alert('Please enter Shop ID and Password');
    }

    try {
      // Make a POST request to the backend API
      const data = {
        "contactMail": email,
        "password": password

      }
      //console.log(JSON.stringify(data));
      const response = await fetch('http://43.204.192.134:27017/api/v1/vendor/login', {
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
      localStorage.setItem('name',result.vendor.name);
      setflag(result.token);
      setName(result.vendor.name)
    }
    else if(result.message==="Invalid credentials, ID and password does not match"){
      alert("Incorrect email or password");
    }
    } catch (error) {
      // Handle errors (show an error message to the user)
      console.error(error.response.data);
    }
  };

  return (
    <div>
      {flag!==''?<VendorHomePage name={name}/>:
    <div className='outer'>
      <div className='container'>
      <img src="images/user.png" alt="" className='userimage2' />
        <h3>Login</h3>
        {/* Add your login form with event handlers */}
        <form>
          <label>
            <input
              type="email"
              placeholder='📧Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='🔑Password'
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
}
</div>
  );
};

export default VendorPage;
