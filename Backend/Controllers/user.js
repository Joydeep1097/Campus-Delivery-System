const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Product = require("../models/Product");

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
        const token = authorizationHeader.substring('Bearer '.length);

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
