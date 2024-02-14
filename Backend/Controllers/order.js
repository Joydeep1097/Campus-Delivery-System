const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/Product");
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
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader ? authorizationHeader.substring('Bearer '.length) : null;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided',
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token',
                });
            }

            const userId = decoded.userId;
            const { cartId } = req.body;

            const cart = await Cart.findById(cartId).populate('products.productID');

            const newOrder = new Order({
                shopID: cart.shopID,
                products: cart.products.map(item => ({
                    productID: item.productID._id,
                    count: item.count,
                })),
                total: cart.total,
            });

            await newOrder.save();

            return res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};