import React from 'react';

const OrderPopup = (props) => {
  return (
    <div className="popup">
      <div className="popup-content2">
        <span className="close" onClick={props.onClose}>&times;</span>
        <h2>Orders</h2>
        <div>
        {props.orders.map((order, index) => (
          <div key={index} className='orders'>
            <h3>Order ID: {order.orderId}</h3>
            <p>Order Date: {new Date(order.timestamp).toLocaleString()}</p>
            <h3>Products:</h3>
            {order.products.map((product, idx) => (
              <div key={idx} className='products'>
                <p>Product ID: {product.productId}</p>
                <p>Product Name: {product.productName}</p>
                <p>Price: {product.productPrice}</p>
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
