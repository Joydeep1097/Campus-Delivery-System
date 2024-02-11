import React, { useCallback, useState } from 'react';
import Popup from './Popup';
const ShowProduct = (props) => {
  const product = props.product;
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(0);
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const addToCart = async () => {
    // Implement logic to add the product to the cart
    console.log('Adding product to cart:', product, 'Quantity:', count);
    const payload = {
      "productID": product.id,
      "productQuantity": count,
      "shopID": props.shopId
    }
    console.log(payload);
    const utoken = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:27017/api/v1/addProductCart', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        alert("product added to cart")
      }
      else if (data.message === "Invalid token") {
        alert("session expired. please login again");
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  return (
    <div>
      <div className="page1">
        <div>
          {product ? (
            <div className='showingproduct'>
              {product.image ? (
                <img src={product.image} alt={product.name} className='product-image1' />
              ) : (
                <img src="images/defaultproduct.png" alt="not available" className='product-image1' />
              )}
              <div className="showingdetails">
                <h1>{product.name}</h1>
                <br />
                <br />
                <p>Price: Rs.{product.price}</p>
                <br />
                <div>
                  <p>Quantity</p>
                  <button2 onClick={handleDecrement}>-</button2>
                  <span>{count}</span>
                  <button2 onClick={handleIncrement}>+</button2>
                </div>
                <br />
              </div>
              <button onClick={addToCart}>🛒 Add to Cart</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ShowProduct;
