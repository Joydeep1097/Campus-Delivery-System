// SignupPage.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SignupPage = () => {
  const [idNo, setIdNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSignup = async () => {
    if (!/^\d{8}$/.test(idNo)) {
      alert('ID Number must be 8 digits');
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert('Name must contain only alphabetical characters');
      return;
    }
    if (!/^\d{10}$/.test(mobileNo)) {
      alert('Mobile Number must be 10 digits');
      return;
    }
    if (!/^\w+@\w+\.\w+$/.test(email)) {
      alert('Email must be in the format digits@alphabetical.alphabetical');
      return;
    }
    console.log('ID Number:', idNo);
    console.log('Name:', name);
    console.log('Password:', password);
    console.log('Mobile Number:', mobileNo);
    console.log('Email:', email);

    // Implement signup logic here (e.g., send data to server, handle form validation)
    try {
      // Make a POST request to the backend API
      const data={
        "idno":idNo,
        "name":name,
        "password":password,
        "mobileno": mobileNo,
        "email":email
      }
      console.log(data);
      const response = await axios.post('http://localhost:4000/signup', data);

      // Handle the response (you can redirect or show a success message)
      console.log(response.data);
  } catch (error) {
      // Handle errors (show an error message to the user)
      console.error(error.response.data);
  }
    // For now, let's just log the signup information to the console
    
    // You can redirect the user or perform other actions after successful signup
  };

  return (
    <div className="outer">
    <div className='container'>
      <h1>Signup</h1>
      <form>
        <label>
          ID Number:
          <input
            type="text"
            value={idNo}
            onChange={(e) => setIdNo(e.target.value)}
            maxLength={8}
          />
        </label>
        <br />
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
        <div className="button-container">
        <button type="button" onClick={handleSignup}>
          Signup
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
  );
};

export default SignupPage;
