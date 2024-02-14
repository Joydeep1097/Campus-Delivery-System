import React from 'react';



const UserOrderPopup = (props) => {
  return (
    <div className="popup">
      <div className="popup-content2">
        <span className="close" onClick={props.onClose}>&times;</span>
        <h2>Order Details</h2>
        <div>
        {props.orders.map((order, index) => (
          <div key={index}>
            <p><strong>Timestamp:</strong> {order.Timestamp}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <h3>Products:</h3>
            {order.products.map((product, idx) => (
              <div key={idx}>
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




export default UserOrderPopup;
