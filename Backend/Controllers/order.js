const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Order = require('../models/order');
const Cart = require('../models/cart');
const razorpayInstance = require("../config/razorpay");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const { generateToken } = require("../Utils/authUtils");
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();


exports.placeOrder = async (req, res) => {
    try {
        // Get data from the request body
        const { userId, cartId } = req.body;

        // Find the cart in the database using the provided cart ID
        const cart = await Cart.findById(cartId).populate('products.productID');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Create a new order object based on the cart data
        const newOrder = new Order({
            shopID: cart.shopID,
            products: cart.products.map(item => ({
                productID: item.productID._id,
                count: item.count,
            })),
            total: cart.total,
            // Set other order fields as needed
        });

        // Save the new order to the database
        await newOrder.save();

        // Optionally, remove the cart from the user's cart list
        // const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { cart: cartId } }, { new: true });

        return res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};