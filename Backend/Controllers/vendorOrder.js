const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Product = require("../models/product");
const Order = require("../models/order");

const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");

const { generateToken } = require("../Utils/authUtils");
const jwt = require('jsonwebtoken');

exports.vendorOrderHistory = async (req, res) => {
    try {
        // Get data from the request body
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader ? authorizationHeader.substring('Bearer '.length) : null;
        // console.log(token);
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
            // console.log("Result : ", req.body);
            // console.log("Vendor Order History");
            // console.log(decoded.userId);
            const vendorId = decoded.userId;
            if(!vendorId){
                console.log("Unable to get vendor ID");
                return res.status(400).json({
                    success: false,
                    message: 'Vendor ID not found',
            });
            }

            const vendorDetails = await Vendor.findById(vendorId)
            .populate('shop') // Populate the 'shop' field
            .exec();
            // console.log(vendorDetails);
            const shopId = vendorDetails.shop._id;
            // console.log(shopId);

            // const orders1 = await Order.find({ shopID: shopId }).populate('products.productID').exec();
            // console.log(orders1);
            // const products1 = orders1.flatMap(order => order.products.map(product => product.productID));
            // console.log("Prodc", products1);
            const orders = await Order.find({ shopID: shopId }).populate({
                path: 'products.productID',
                select: 'name price image', // Select only the fields you need
            });

            // console.log("orders",orders);
            // Map orders to desired format
            // const formattedOrders = orders.map(order => ({
            //     orderId: order._id,
            //     shopID: order.shopID,
            //     // count: order.count,
            //     products: order.products.map(product => product.productID).forEach(product => {
            //         console.log("Product ID:", product.name);
            //         console.log("Product Price", product.price);
            //     }),
            //     count: order.products.map(product => product.count)
            // }));
            // const productDetails =[];
            // orders1.products.forEach(product => {
            //     productDetails.push({
            //         productId: product._id,
            //         productName: product.name,
            //         productPrice: product.price
            //     });
            // });
            // console.log(productDetails);



            // const formattedOrders = orders.map(order => ({

            //     orderId: order._id,
            //     shopID: order.shopID,
            //     timestamp: order.Timestamp,
            //     products: order.products.forEach(product => {
            //         const productDetails1 = [];
            //         productDetails1.push({
            //             productName: product.productID.name,
            //             productPrice: product.productID.price,
            //         });
            //         product: productDetails1
            //     }),
            //     count: order.products.map(product => product.count)
            // }));
            // console.log(productDetails);
            // console.log(formattedOrders);
            // const formattedOrders1 = orders.map(order => ({
            //     orderId: order._id,
            //     shopID: order.shopID,
            //     timestamp: order.Timestamp,
            //     products: order.products,
            //     count: order.products.map(product => product.count)
            // }));

            const formattedOrders1 = orders.map(order => ({
                orderId: order._id,
                shopID: order.shopID,
                timestamp: order.Timestamp,
                products: order.products? order.products.map(product => ({
                    productId: product.productID._id, // Assuming products is an object with a productID property
                    productName: product.productID.name, // Assuming products is an object with a name property
                    productPrice: product.productID.price, // Assuming products is an object with a price property
                    count: product.count,
                })):[],
            }));

            // console.log(formattedOrders1);

            //
            // const formattedOrders = orders.map(order => ({
            //     orderId: order._id,
            //     shopID: order.shopID,
            //     products: order.products.map(product => ({
            //         productId: product.productID,
            //         name: product.name,
            //         price: product.price
            //     })),
            //     count: order.products.map(product => product.count)
            // }));
            // console.log(orders);
            // console.log("Formatted",formattedOrders);
            return res.status(200).json({
                success: true,
                message: 'Vendor Order fetched successfully',
                orderList: formattedOrders1,
            });
        });
    }catch (error) {
        console.error(error);
                      return res.status(500).json({
                          success: false,
                          message: 'Internal Server Error',
                      });
    }
};
exports.vendorOrderHistoryy = async (req, res) => {
    try {
        // Get data from the request body
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

            const vendorId = decoded.userId;
            if (!vendorId) {
                return res.status(400).json({
                    success: false,
                    message: 'Vendor ID not found',
                });
            }

            const vendorDetails = await Vendor.findById(vendorId)
                .populate('shop') // Populate the 'shop' field
                .exec();

            if (!vendorDetails || !vendorDetails.shop) {
                return res.status(404).json({
                    success: false,
                    message: 'Vendor or shop details not found',
                });
            }

            const shopId = vendorDetails.shop._id;

            const orders = await Order.find({ shopID: shopId }).populate({
                path: 'products.productID',
                select: 'name price image', // Select only the fields you need
            });

            const formattedOrders = orders.map(order => ({
                orderId: order._id,
                shopID: order.shopID,
                timestamp: order.Timestamp,
                products: order.products ? order.products.map(product => ({
                    productId: product.productID?._id, // Use optional chaining to safely access _id
                    productName: product.productID?.name, // Use optional chaining to safely access name
                    productPrice: product.productID?.price, // Use optional chaining to safely access price
                    count: product.count,
                })) : [],
            }));

            return res.status(200).json({
                success: true,
                message: 'Vendor Order fetched successfully',
                orderList: formattedOrders,
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};