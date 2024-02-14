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
                            <p><strong>Order Id::</strong> {order._id}</p>
                            <p><strong>Shop Name::</strong> {order.shopID.name}</p>
                            <p>Timestamp: {order.Timestamp}</p>
                            <p>Status: {order.status}</p>
                            <h3>Products:</h3>
                            {order.products.map((product, idx) => (
                                <div key={idx}>
                                    {product.productID ?
                                        (<div>
                                            <p>Name: {product.productID.name}</p>
                                            <p>Price: {product.productID.price}</p>
                                            <p>Count: {product.count}</p>
                                       </div>):<div><p>No orders to show</p></div>}
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
