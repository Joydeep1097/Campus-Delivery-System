// HomePage.js
import React from 'react';
import Navbar from './Navbar'; // Adjust the path based on your project structure
import Footer from './Footer';

import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="contents">
      <div className='writings-left'>
        <h1>Welcome to Campus Bazar!</h1>
        <p>
          Explore a wide range of products and services offered by our campus community.
        </p>
        {/* Add more content as needed */}
      </div>
      <div className="writings-right">
        <h1>Connecting Students, Unleashing Possibilities</h1>
        <p>Join us at Campus Bazar – where every click opens up a world of opportunities!</p>
        <div className="button-container">
        <Link to="/signup">
          <button type="button" className="back-button">
            Join Now ⬇
          </button>
          </Link>
          </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
