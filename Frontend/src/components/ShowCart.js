import React, { useState, useEffect } from 'react';

const ShowCart = (props) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, [props.cartItems]); // Fetch cart data whenever props.cartItems change

    const fetchCart = async () => {
        const utoken = localStorage.getItem("token");
        try {
            const response = await fetch('http://localhost:27017/api/v1/getUserCartProducts', {
                method: 'GET',
                headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setCart(data.shop.products);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handledrop = async (_id) => {
        const utoken = localStorage.getItem("token");
        const payload = { "productID": _id };
        try {
            const response = await fetch('http://localhost:27017/api/v1/deleteProductFromCart', {
                method: 'POST',
                headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data);
            if (data.success === true) {
                alert("Product deleted");
                // Fetch cart data again after successful deletion
                fetchCart();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="cart-container1">
            <div>
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div >
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div>
                                {item.image ? <img src={item.image} alt={item.name} className='item-image' /> :
                                <img src="images/defaultproduct.png" alt="not here" className='item-image' />}
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: Rs.{item.price}</p>
                                    <p>Quantity: {item.ProductQuantity}</p>
                                </div>
                                <button3 onClick={() => handledrop(item.id)}>Remove</button3>
                            </div>
                        ))}
                        <button4>Place Order</button4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowCart;
