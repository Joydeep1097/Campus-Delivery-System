// SignupPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ShopRegistration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [shopno, setShopno] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const handleSubmit = async () => {
    if (!/^[A-Za-z0-9\s]+$/.test(name)) {
      alert('Name must contain only alphabetical characters');
      return;
    }
    if (!/^[A-Za-z0-9\s]+$/.test(description)) {
        alert('Name must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(shopno)) {
        alert('Name must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(locality)) {
        alert('Name must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(city)) {
        alert('Name must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(state)) {
        alert('Name must contain only alphabetical characters');
        return;
      }
      if (!/^[0-9\s]+$/.test(pincode)) {
        alert('Name must contain only alphabetical characters');
        return;
      }
    

    // Implement signup logic here (e.g., send data to server, handle form validation)
    try {
      // Make a POST request to the backend API
      const data = {

      }
      const response = await fetch('http://localhost:27017/api/v1/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    if(result.success===true){
      alert("Successful. You can now Log in to your account");
    }
    else if(result.message==="User already exists"){
      alert("already registerd. Go for log in");
    }
    else{
      alert("Sorry we are facing some problem. Please try again after some time");
    }
    } catch (error) {
      // Handle errors (show an error message to the user)
      //console.error(error.response.data);
      alert("Sorry we are facing some problem. Please try again after some time");
    }
  };

  return (
    <div className="outer">
      <div className='container'>
        <h1>Shop Registration</h1>
        <form>
          <label>
            Shop Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            About Shop:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
            />
          </label>
          <br />
          <div className="address">
            <div className='right'>
          <label>
            Shop No:
            <input
              type="text"
              value={shopno}
              onChange={(e) => setShopno(e.target.value)}
              maxLength={10}
            />
          </label>
          <br />
          <label>
            Locality:
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              maxLength={50}
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={20}
            />
          </label>
          </div>
          <br />
          <div className='left'>
          <label>
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              maxLength={20}
            />
          </label>
          <br />
          <label>
            Pin Code:
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
          </label>
          <br />
          <label>
            Logo Or Photo:
            <input
              type="file"
              value={photo}
              accept="image/*"
              onChange={(e) => setPhoto(e.target.value)}
            />
          </label>
          </div>
          </div>
          <br />
          <div className="button-container">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
            <Link to="/">
              <button type="button" className="back-button">
                Discard
              </button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ShopRegistration;
