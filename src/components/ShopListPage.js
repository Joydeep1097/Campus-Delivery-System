// ShopListPage.js

import React, { useState, useEffect } from 'react';
import UserView from './UserView';

const ShopListPage = () => {
  const [shops, setShops] = useState([]);
  const [shopid,setshopid]= useState([0]);
  useEffect(() => {
    // Mock shop data
    const mockShops = [
      {
        id: 1,
        name: 'Electro World',
        description: 'Your one-stop shop for electronic gadgets!',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Fashion Hub',
        description: 'Trendy fashion for every style!',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Book Paradise',
        description: 'Explore the world through books!',
        image: 'https://via.placeholder.com/150',
      },
    ];

    setShops(mockShops);
  }, []);

  const handleShopSelection = (selectedShopId) => {
    console.log('User selected shop with ID:', selectedShopId);
    // You can add logic to navigate to the selected shop's page or perform other actions
    setshopid(selectedShopId);
  };

  return (
    <>
   {shopid>0 ? <UserView/>:
    <div>
    <div className="outer">
    <div className="shop-list-page">
      <ul className='ul1'>
        {shops.map((shop) => (
          <li key={shop.id} className="shop-card">
            <div className="shop-image">
              <img src={shop.image} alt={shop.name} />
            </div>
            <div className="shop-details">
              <h3>{shop.name}</h3>
              <p>{shop.description}</p>
              <button onClick={() => handleShopSelection(shop.id)}/>
              
            </div>
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
