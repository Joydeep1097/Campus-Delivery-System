// ShopListPage.js

import React, { useState, useEffect } from 'react';
import UserShopPage from './UserShopPage';

const ShopListPage = () => {
  const [shops, setShops] = useState([]);
  const [shopid,setshopid]= useState([0]);
  const [loading, setLoading] = useState(true);
  console.log(shopid)
  useEffect(() => {
    const fetchShops = async () => {
      const utoken = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:27017/api/v1/getShopList',{
          method: 'POST',
          headers: { Authorization: `Bearer ${utoken}` }
        }); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data)
        setShops(data.shopData);
        //console.log(shops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []); 

  const handleShopSelection = (selectedShopId) => {
    console.log('User selected shop with ID:', selectedShopId);
    // You can add logic to navigate to the selected shop's page or perform other actions
    setshopid(selectedShopId);
    
  };

  return (
   <>
   {shopid!="0" ? <UserShopPage id={shopid}/>:
    <div>
    <div className="outer">
      <div className="writings-lower">
      <ul className='writings-lower'>
        {shops.map((shop) => (
          <li key={shop.id} className="shop-card">
            <div className="shop-image">
              <img src={shop.image} alt={shop.name} />
            </div>
            <div className="shop-details">
              <h3>{shop.name}</h3>
              <p>{shop.shopDescription}</p>
            </div>
            <br />
            <button onClick={() => handleShopSelection(shop._id)}>Enter</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
    }
    </>
  );
};

export default ShopListPage;
