// Cart.js

import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="cart">
      <div className="cart-icon" onClick={() => alert('Open cart or show dropdown')}>
        🛒
      </div>
      <div className="cart-count">{cartItems.length}</div>
    </div>
  );
};

export default Cart;
