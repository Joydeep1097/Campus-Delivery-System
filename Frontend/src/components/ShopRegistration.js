// SignupPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ShopRegistration = (props) => {
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
        alert('description must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(shopno)) {
        alert('shopno must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(locality)) {
        alert('locality must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(city)) {
        alert('city must contain only alphabetical characters');
        return;
      }
      if (!/^[A-Za-z0-9\s]+$/.test(state)) {
        alert('state must contain only alphabetical characters');
        return;
      }
      if (!/^[0-9\s]+$/.test(pincode)) {
        alert('pincode must contain only alphabetical characters');
        return;
      }
      const formData = new FormData();

      // Append text fields to FormData
      formData.append('name', props.name);
      formData.append('contactNo', props.contactNo);
      formData.append('contactMail', props.contactMail);
      formData.append('password', props.password);
      formData.append('shopData[name]', name);
      formData.append('shopData[shopDescription]', description);
      formData.append('shopData[addressData][streetAddress]', locality);
      formData.append('shopData[addressData][houseNo]', shopno);
      formData.append('shopData[addressData][state]', state);
      formData.append('shopData[addressData][city]', city);
      formData.append('shopData[addressData][pincode]', pincode);
  
      // Append image file to FormData
      formData.append('image', photo);

    // Implement signup logic here (e.g., send data to server, handle form validation)
    try {
      // Make a POST request to the backend API
      const response = await fetch('http://43.204.192.134:27017/api/v1/vendor/signup', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    console.log(result);
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
      console.log(error.response.data);
      alert("Sorry we are facing some problem. Please try again after some time");
    }
  };

  return (
    <div className="outer">
      <div className='container'>
        <h1>Shop</h1>
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
            className='fileselector'
              type="file"
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setPhoto(e.target.files[0]);
              }}
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
