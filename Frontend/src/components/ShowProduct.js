import React, { useCallback, useState } from 'react';

const ShowProduct = (props) => {
  const product = props.product;
  const [count, setCount] = useState(1);
  const [back, setBack] = useState(0);
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };
  
  const addToCart = () => {
    // Implement logic to add the product to the cart
    console.log('Adding product to cart:', product, 'Quantity:', count);
  };

  return (
    <div>
      <div className="page1">
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
  );
};

export default ShowProduct;
