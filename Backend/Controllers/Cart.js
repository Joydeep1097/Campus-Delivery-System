const bcrypt = require("bcrypt");
const User = require("../models/user");
const Product = require("../models/Product");
const { generateToken } = require("../utils/authUtils");
const Shop = require("../models/shop");
const Order = require("../models/order");
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');
const { image } = require("../config/cloudinary");
const ObjectId = require('mongodb').ObjectId;


exports.addToCart = async (req, res) => {
  try {
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

      const userId = decoded.userId;
      try {
        // Get data from the request body
        const { productID, productQuantity, shopID } = req.body;

        // Check if all required fields are provided
        if (!productID || !productQuantity || !shopID) {
          return res.status(400).json({
            success: false,
            message: 'Product ID, product quantity, and shop ID are required.',
          });
        }

        // Find the user and populate the cart
        const user = await User.findById(userId).populate('cart');
        console.log(user);

        // Get the cart from the populated user object
        let cart = user.cart;
        console.log("Cart", cart)


        // If the user has a cart and its shopID matches the input shopID
        if (cart && cart.shopID.equals(shopID)) {
          // Check if the product already exists in the cart
          const existingProduct = cart.products.find(product => product.productID.equals(productID));
          console.log("existingProduct", existingProduct)
          if (existingProduct) {
            // Update the quantity of the existing product
            existingProduct.count += productQuantity;
          } else {
            // Add the product to the cart
            cart.products.push({ productID, count: productQuantity });
          }
        } else {
          if(cart){
          await Cart.findByIdAndDelete(cart._id);}
          // If the user does not have a cart or the shopID is different, create a new cart
          cart = new Cart({ shopID, user: userId });
          // Add the product to the new cart
          cart.products.push({ productID, count: productQuantity });
        }

        // Save the cart
        await cart.save();

        // Update user model with the new cart ID
        const updatedUser = await User.findByIdAndUpdate(userId, { cart: cart._id }, { new: true });

        return res.status(200).json({
          success: true,
          message: 'Product added to the cart successfully',
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


exports.updateProductCountInCart = async (req, res) => {
  try {
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

      const userId = decoded.userId;
      try {
        // Get data from the request body
        const { productID, productQuantity } = req.body;

        // Check if all required fields are provided
        if (!productID || !productQuantity) {
          return res.status(400).json({
            success: false,
            message: 'Product ID and product quantity are required.',
          });
        }

        // Find the user and populate the cart
        const user = await User.findById(userId).populate('cart');

        // Get the cart from the populated user object
        const cart = user.cart;

        // Check if the user has a cart
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found for the user' });
        }

        // Find the index of the product in the cart
        const productIndex = cart.products.findIndex(product => product.productID.equals(productID));

        // Check if the product exists in the cart
        if (productIndex === -1) {
          return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Update the quantity of the product
        cart.products[productIndex].count = productQuantity;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({
          success: true,
          message: 'Cart updated successfully',
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

/*
exports.getUserCartProducts = async (req, res) => {
  try {
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
              const userId = decoded.userId;

              console.log(userId.cart);
              console.log("----------------------")

              const user = await User.findById(userId).populate({
                  path: 'cart',
                  populate: {
                      path: 'products',
                      // populate: {
                      //   path: 'productID',
                        options: { strictPopulate: false },
                      //populate: { path: 'shopID' } // Populate shop details for each product
                  },
                // },
              });


              if (!user) {
                  return res.status(404).json({ message: 'User not found' });
              }

              const cart = user.cart;
              console.log(cart);
              if (!cart) {
                  return res.status(404).json({ message: 'Cart not found for the user' });
              }

              // const shop = {
              //     id: cart.shopID._id.toString(),
              //     name: cart.shopID.name,
              //     products: cart.products.map(item => ({
              //         id: item.productID._id.toString(),
              //         name: item.productID.name.toString(),
              //         price: item.productID.price.toString(),
              //         ProductQuantity: item.count
              //     }))
              // };
              const shop = {
                id: cart.shopID._id.toString(),
                name: "", // Placeholder for the shop name
                products: []
            };

            // Fetch shop name
            const shopData = await Shop.findById(cart.shopID);
            shop.name = shopData ? shopData.name : "Shop not found";


              for (const item of cart.products) {
                const productData = await Product.findById(item.productID);
                if (productData) {
                    shop.products.push({
                        id: item.productID._id.toString(),
                        name: productData.name.toString(),
                        price: productData.price.toString(),
                        ProductQuantity: item.count
                    });
                  };
                }

              res.json({ shop });

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
*/
exports.deleteProductFromCart = async (req, res) => {
  try {
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

      const userId = decoded.userId;
      try {
        // Get the product ID from the request body
        const { productID } = req.body;

        // Check if the product ID is provided
        if (!productID) {
          return res.status(400).json({
            success: false,
            message: 'Product ID is required.',
          });
        }

        // Find the user and populate the cart
        const user = await User.findById(userId).populate('cart');

        // Get the cart from the populated user object
        const cart = user.cart;

        // Check if the user has a cart
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found for the user' });
        }

        // Find the index of the product in the cart
        const productIndex = cart.products.findIndex(product => product.productID.equals(productID));

        // Check if the product exists in the cart
        if (productIndex === -1) {
          return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({
          success: true,
          message: 'Product removed from the cart successfully',
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

exports.getUserCartProducts = async (req, res) => {
  try {
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
              const userId = decoded.userId;

              console.log("USER CARTID",userId.cart);
              console.log("----------------------")

              const user = await User.findById(userId).populate({
                  path: 'cart',
                  populate: {
                      path: 'products',
                      // populate: {
                      //   path: 'productID',
                        options: { strictPopulate: false },
                      //populate: { path: 'shopID' } // Populate shop details for each product
                  },
                // },
              });

              console.log("USER PORDCUTS",user.products);


              if (!user) {
                  return res.status(404).json({ message: 'User not found' });
              }

              const cart = user.cart;
              console.log("CART",cart);
              if (!cart) {
                  return res.status(404).json({ message: 'Cart not found for the user' });
              }

              // const shop = {
              //     id: cart.shopID._id.toString(),
              //     name: cart.shopID.name,
              //     products: cart.products.map(item => ({
              //         id: item.productID._id.toString(),
              //         name: item.productID.name.toString(),
              //         price: item.productID.price.toString(),
              //         ProductQuantity: item.count
              //     }))
              // };
              const shop = {
                id: cart.shopID._id.toString(),
                name: "", // Placeholder for the shop name
                products: []
            };

            const productIDs = cart.products.map(product => product.productID);
            const objectIdArray = productIDs.map(id => new ObjectId(id));
            // Fetch documents based on the array of productID values
            // const products = await Product.find({ productID: { $in: objectIdArray } }).toArray();
            const products = await Product.find({ _id: { $in: objectIdArray } }).exec();
            

            // Format the fetched data
            const formattedData = products.map(product => ({
              id: product._id.toString(), // Convert ObjectId to string
              name: product.name,
              price: product.price,
              image: product.image
              // Add other fields as needed
            }));
            console.log("FORMatted",formattedData); 


            // Fetch shop name
            const shopData = await Shop.findById(cart.shopID);
            shop.name = shopData ? shopData.name : "Shop not found";


              for (const item of cart.products) {
                const productData = await Product.findById(item.productID);
                if (productData) {
                    shop.products.push({
                        id: item.productID._id.toString(),
                        name: productData.name.toString(),
                        price: productData.price.toString(),
                        image: productData.image,
                        ProductQuantity: item.count
                    });
                  };
                }
                             

              res.json({ shop });

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