import React, { useState } from 'react';
import ShowCart from './ShowCart';

const Cart = (props) => {
  const [showcartItems, setshowCartItems] = useState(0);
  const [showcategoryPopup, setShowcategoryPopup] = useState(false);
  const [cartback, setCartback] = useState([]);
  //setCartback(props.cart);
  const getCartback =(cartback)=>{
   setCartback(cartback);
   console.log(cartback)
  };
  const handlePopupClose = () => {
    setShowcategoryPopup(false);
    setshowCartItems(0);
  };
  const handlecartclick = () => {
    setShowcategoryPopup(true);
    setshowCartItems(1);
  };
  return (
    <div>
      {showcartItems ? 
      showcategoryPopup &&  (
        <div className="popup">
          <div className="popup-content1">
            <span className="close" onClick={handlePopupClose}><strong/>&times;</span>
            <ShowCart cartItems={props.cart} onSubmit={getCartback} />
          </div>
        </div>
      ) : (
        <div className="user-name">
          <div className="cart-icon" onClick={() => handlecartclick() }>
            🛒
            <div className="cart-count">{props.cart.length}</div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Cart;
