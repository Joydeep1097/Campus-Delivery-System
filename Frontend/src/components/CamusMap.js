// CampusMap.js
import React from 'react';

const CampusMap = () => {
  return (
    <div className="map-container">
    <h2>CampusMap</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.737361232549!2d81.65704617471802!3d21.162847883160612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28db65364103d5%3A0x9ca0815dc09dac5f!2sIndian%20Institute%20of%20Technology%20Bhilai!5e0!3m2!1sen!2sin!4v1707895075756!5m2!1sen!2sin" width="600" height="450" style={{border: "0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
</div>
  );
};

export default CampusMap;
