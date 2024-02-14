// SignupPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gotologin, setGotologin] = useState(0);

  const handleSignup = async () => {
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
    //console.log('Name:', name);
    //console.log('Password:', password);
    //console.log('Mobile Number:', mobileNo);
    //console.log('Email:', email);

    // Implement signup logic here (e.g., send data to server, handle form validation)
    try {
      // Make a POST request to the backend API
      const data = {
        "name": name,
        "contactNo": mobileNo,
        "contactMail": email,
        "password": password

      }
      const response = await fetch('http://43.204.192.134:27017/api/v1/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success === true) {
        alert("Successful. You can now Log in to your account");
        setGotologin(1);
      }
      else if (result.message === "User already exists") {
        alert("already registerd. Go for log in")
        setGotologin(1);
      }
      else {
        alert("Sorry we are facing some problem. Please try again after some time");
      }
    } catch (error) {
      // Handle errors (show an error message to the user)
      //console.error(error.response.data);
      alert("Sorry we are facing some problem. Please try again after some time");
    }
  };

  return (
    <>
      {gotologin === 1 ? <LoginPage /> :
        <div className="outer">
          <div className='container'>
            <img src="images/user.png" alt="" className='userimage2' />
            <h1>Signup</h1>
            <form>
              <label>
                <input
                  type="text"
                  value={name}
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                  pattern="[A-Za-z]+"
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  value={mobileNo}
                  placeholder='📞Contact No'
                  onChange={(e) => setMobileNo(e.target.value)}
                  minLength={10}
                  maxLength={10}
                />
              </label>
              <br />
              <label>
                <input
                  type="email"
                  value={email}
                  placeholder='📧Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
              <label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder='🔑Password'
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
      }
    </>
  );
};

export default SignupPage;
