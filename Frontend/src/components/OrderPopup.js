import React from 'react';

const OrderPopup = (props) => {
  return (
    <div className="popup">
      <div className="popup-content2">
        <span className="close" onClick={props.onClose}>&times;</span>
        <h2>Orders</h2>
        <div>
        {props.orders.map((order, index) => (
          <div key={index}>
            <h3>Order ID: {order.orderId}</h3>
            <p>Order Date: {new Date(order.timestamp).toLocaleString()}</p>
            <h3>Products:</h3>
            {order.products.map((product, idx) => (
              <div key={idx}>
                <p>Product Name: {product.productDetails && product.productDetails.name}</p>
                <p>Price: {product.productDetails && product.productDetails.price}</p>
                <p>Count: {product.count}</p>
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
