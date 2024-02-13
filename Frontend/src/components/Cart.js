// Cart.js

import React, { useState } from 'react';

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    console.log(item)
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="user-name">
      <div className="cart-icon" onClick={() => alert(props.cart[0].name)}>
        🛒
      </div>
      {console.log(props.cart)}
      <div className="cart-count">{props.cart.length}</div>
    </div>
  );
};

export default Cart;
