
import React from 'react';
import {  Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage'; // Import your home page component
import LoginPage from './components/LoginPage'; // Import your login page component
import SignupPage from './components/SignupPage'; // Import your signup page component
import VendorPage from './components/VendorPage';
import AboutUsPage from './components/AboutUsPage';
import './App.css';

const App = () => {
  return (
    <div>
      
        <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
        
        </div>
  );
};

export default App;
