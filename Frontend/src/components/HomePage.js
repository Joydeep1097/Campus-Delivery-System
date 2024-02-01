// HomePage.js
import React from 'react';
import Navbar from './Navbar'; // Adjust the path based on your project structure
import Footer from './Footer';

import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className='home'>
      <Navbar />

      <div className="contents">
        <div className='writings-upper'>
          <h1>Welcome to Campus Bazar!</h1>
          <p>
            Explore a wide range of products and services offered by our campus community.
          </p>
          {/* Add more content as needed */}
        </div>

        <div className="writings-lower">
          <div className='pockets'>
            <img src="images/sideimage.jpg" alt="" className='image2' />
            <h5>Showcase your products to a wide and engaged audience, boosting your brand visibility and recognition within the community.</h5>
            <div className="button-container">
              <Link to="/vendor">
                <button type="button" className="back-button">
                  Join Now ⬇
                </button>
              </Link>
            </div>
          </div>
          <div className='pockets'>
            <img src="images/1704102229834.jpeg" alt="" className='image2' />
            <h5>Explore a curated marketplace that brings together the best of local businesses and student entrepreneurs. Support your peers and discover unique gems right from your campus!</h5>
            <div className="button-container">
              <Link to="/signup">
                <button type="button" className="back-button">
                  Join Now ⬇
                </button>
              </Link>
            </div>
          </div>
          <div className='pockets'>
            <img src="images/cart.jpg" alt="" className='image2' />
            <h1>Connecting Students, Unleashing Possibilities</h1>
            <h5>From tech to textbooks, style to snacks, find everything you need for campus life at your fingertips. Explore, shop, and make your student experience extraordinary with Campus Bazar – where variety meets convenience!</h5>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
