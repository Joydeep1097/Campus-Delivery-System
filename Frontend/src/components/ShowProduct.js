import React, { useState, useEffect } from 'react';

const ShowProduct = (props) => {
  console.log(props.product)

  /*useEffect(() => {
    const fetchProductData = async () => {
      
  }, []);*/

  /*const addToCart = () => {
    // Implement logic to add the product to the cart
    console.log('Adding product to cart:', product);
  };*/

  return (
    <div className="product-details">
      {props.product ? (
        <>
          <h2>{props.product.name}</h2>
          <img src={props.product.image} alt={props.product.name} />
          <p>Price: ${props.product.price}</p>
          <button >Add to Cart</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowProduct;
