import React, { useState, useEffect } from 'react';

const ShowCart = (props) => {
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState('');
    useEffect(() => {
        fetchCart();
    }, [props.cartItems]); // Fetch cart data whenever props.cartItems change

    const fetchCart = async () => {
        const utoken = localStorage.getItem("token");
        try {
            const response = await fetch('http://43.204.192.134:27017/api/v1/getUserCartProducts', {
                method: 'GET',
                headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.log(data);
            props.onSubmit(cart)
            if(data.message==="Cart not found for the user"){
                setCart([]);
            }
            else{
                setCart(data.shop.products);
                setCartId(data.shop.cartId);
            }
            
            
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handledrop = async (_id) => {
        const utoken = localStorage.getItem("token");
        const payload = { "productID": _id };
        try {
            const response = await fetch('http://43.204.192.134:27017/api/v1/deleteProductFromCart', {
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

    // Calculate total amount to be paid
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.ProductQuantity), 0);
    const handleorderplace = async (_cartid) => {
        const utoken = localStorage.getItem("token");
        const payload = { "cartId": _cartid };
        console.log(payload)
        try {
            const response = await fetch('http://43.204.192.134:27017/api/v1/placeOrder', {
                method: 'POST',
                headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data);
            if (data.success === true) {
                fetchCart();
                alert("Order Placed");
                // Fetch cart data again after successful deletion
                
            }
        } catch (error) {
            console.error('Error processing Order', error);
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
                                <button6 onClick={() => handledrop(item.id)} style={{cursor:"pointer"}}>❌</button6>
                            </div>
                        ))}
                        <div className="total-amount">Total Amount: Rs.{totalAmount.toFixed(2)}</div>
                        <br />
                        <button4 onClick={ () =>handleorderplace(cartId)}>Place Order</button4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowCart;
