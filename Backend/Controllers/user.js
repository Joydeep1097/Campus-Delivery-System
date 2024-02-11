const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Product = require("../models/Product");
const razorpayInstance = require("../config/razorpay");

const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const { generateToken } = require("../utils/authUtils");

const jwt = require('jsonwebtoken'); // Make sure to import the 'jsonwebtoken' library

exports.userGetShopCProducts = async (req, res) => {
    try {
        // Get data from the request body
        const { shopId } = req.body;

        if (!shopId) {
            return res.status(400).json({
                success: false,
                message: 'Shop ID not provided',
            });
        }

        // Verify token
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

            try {
                // Find the shop and populate its categories and products
                const shop = await Shop.findById(shopId)
                    .populate({
                        path: 'category',
                        populate: {
                            path: 'productID',
                            options: { strictPopulate: false },
                        },
                    });

                if (!shop) {
                    return res.status(404).json({ message: 'Shop not found' });
                }

                const categories = shop.category;

             
                if (!categories) {
                  return res.status(404).json({ message: 'Categories not found for the shop' });
                }
  
                const formattedCategories = categories.map(category => ({
                  id: category._id,
                  name: category.categoryName,
                  products: category.productID ? category.productID.map(product => ({
                      
                    id: product._id,
                    name: product.name,
                    price: product.price
                    // ... other product fields
                  })) : [],
                }));

                
                
                res.json({
                    shop: {
                        id: shop._id,
                        name: shop.name,
                        shop: { id: shopId, name: shop.name, categories: formattedCategories }
                    },
                });

            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error',
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.validateTokenUser = async (req, res) => {
    try {
        // Get data from the request body
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader ? authorizationHeader.substring('Bearer '.length) : null;
      
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided for user',
            });
        }
      
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token for user',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Validated User token successfully',
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

exports.razorpayPayment = async (req, res) => {
    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpayInstance.orders.create(options)
        return res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       return res.status(400).send('Not able to create order. Please try again!');
    }
};

exports.searchProduct = async (req, res) => {
    try {
    // Get data from the request body
    const { shopId } = req.body;
    const { searchString } = req.body;
    if (!shopId) {
        return res.status(400).json({
            success: false,
            message: 'Shop ID not provided',
        });
    }
    
    if (!searchString) {
        return res.status(400).json({
            success: false,
            message: 'Search string is empty',
        });
    }

    // Verify token
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
    });

    try {
        // Find the shop and populate its categories and products
        const shop = await Shop.findById(shopId)
            .populate({
                path: 'category',
                populate: {
                    path: 'productID',
                    options: { strictPopulate: false },
                },
            });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        const categories = shop.category;

        // console.log(categories);
     
        if (!categories) {
          return res.status(404).json({ message: 'Categories not found for the shop' });
        }

        const formattedCategories = categories
        .map(category => ({
        id: category._id,
        name: category.categoryName,
        products: category.productID ? category.productID
            .filter(product => {
                // Filter products based on the regex pattern for the name field
                const regexPattern = new RegExp(searchString, 'i'); // Regex pattern to match "searchString" (case-insensitive)
                return regexPattern.test(product.name);
            })
            .map(product => ({
                id: product._id,
                name: product.name,
                price: product.price
                // ... other product fields
            })) : [],
    }))
    .filter(category => category.products.length > 0); // Filter out categories with empty products array
   
        console.log(formattedCategories);
        
        res.json({
            shop: {
                id: shop._id,
                name: shop.name,
                shop: { id: shopId, name: shop.name, categories: formattedCategories }
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
