const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Product = require("../models/Product");

const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");

const { generateToken } = require("../Utils/authUtils");
const jwt = require('jsonwebtoken');


exports.vendorCategory = async (req, res) => {
    try {
        // Get data from the request body
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.substring('Bearer '.length);
        console.log(token);
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
            console.log("Result : ", req.body);
            
                    // Use the shop information from the vendor object
                    console.log(decoded.userId);

                    // let shop = Vendor.findById(decoded.userId).shop;
                    // console.log(Vendor.findById(decoded.userId).name);
                    // // If shop doesn't exist, create a new one
                    // if (!shop) {
                    //     console.log('Shop not found in vendor object');
                    //     return;
                    // }
                    // console.log(shop.shopName);
                    try {
                      // Use the shop information from the vendor object
                      const vendor = await Vendor.findById(decoded.userId);
      
                      if (!vendor) {
                          console.log('Vendor not found');
                          return res.status(404).json({
                              success: false,
                              message: 'Vendor not found',
                          });
      
                        }
      
                      // Replace 'joyshop' with the actual field in your vendor model that holds the shopName
                      const shopName = await Shop.findById().shopName; // Replace with the actual field name
                      console.log(shopName);
                      console.log("Result : ", req.body);
      
                      // Call addCategoryAndProducts with the shopName from the vendor
                      //await addCategoryAndProducts(decoded.userId, shopName, req.body);
      
                      return res.status(200).json({
                          success: true,
                          message: 'Records stored successfully',
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
    }
};

exports.vendorUpdateCategoryName = async (req, res) => {
    try {
        // Get data from the request body
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.substring('Bearer '.length);
        console.log(token);
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

            try {
                const vendor = await Vendor.findById(vendorId);
        
                if (!vendor) {
                  return res.status(404).json({ message: 'Vendor not found' });
                }
        
                const categoryId = req.body.cat_id;
                const newCategoryName = req.body.new_category_name;
        
                if (!categoryId || !newCategoryName) {
                  return res.status(400).json({
                    success: false,
                    message: 'Invalid request format',
                  });
                }
        
                await updateCategoryName(categoryId, newCategoryName);
        
                return res.status(200).json({
                  success: true,
                  message: 'Category name updated successfully',
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
    }
};

exports.vendorUpdateProductDetail = async (req, res) => {
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

            try {
                const vendor = await Vendor.findById(vendorId);
        
                if (!vendor) {
                  return res.status(404).json({ message: 'Vendor not found' });
                }
                console.log(req.body);
                const productId = req.body.product_id;
                const updatedProductDetails = req.body[productId];
        
                if (!productId || !updatedProductDetails) {
                  return res.status(400).json({
                    success: false,
                    message: 'Invalid request format',
                  });
                }
                //Upload image to cloudinary
                // console.log(req.file);
                if(req.file===undefined){
                  // console.log("if");
                  await updateProductDetails(productId, updatedProductDetails, "https://qph.cf2.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq");
                }
                else{
                  const result = await cloudinary.uploader.upload(req.file.path);
                  await updateProductDetails(productId, updatedProductDetails, result.url);
                }
                return res.status(200).json({
                  success: true,
                  message: 'Product details updated successfully',
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
    }
};


const updateProductDetails = async (productId, updatedProductDetails, imagePath) => {
    try {
      // Find the product by ID
      const product = await Product.findById(productId);
  
      if (!product) {
        console.log('Product not found');
        throw new Error('Product not found');
      }
  
      // Update the product details
      Object.assign(product, updatedProductDetails);
      
      if (imagePath) {
        product.image = imagePath;
      }

      // Save changes to the database
      await product.save();
  
      console.log('Product details updated successfully');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
exports.vendorAddProduct = async (req, res) => {
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
            try {
                const vendor = await Vendor.findById(vendorId);
        
                if (!vendor) {
                  return res.status(404).json({ message: 'Vendor not found' });
                }
                const categoryId = req.body.cat_id;
                const productDetails = req.body[categoryId];
                if (!categoryId || !productDetails) {
                  return res.status(400).json({
                    success: false,
                    message: 'Invalid request format',
                  });
                }

                if(req.file===undefined){
                  await addProductToCategory(categoryId, productDetails, "https://qph.cf2.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq");
                }
                else{
                  const result = await cloudinary.uploader.upload(req.file.path);
                  console.log(result);
                  await addProductToCategory(categoryId, productDetails, result.url);
                }
        
                return res.status(200).json({
                  success: true,
                  message: 'Product added to the category successfully',
                });
              } catch (error) {
                console.error(error);
                return res.status(500).json({
                  success: false,
                  message: 'Internal Server Error',
                });
              }

            // console.log("Result : ", req.body);
            // // addCategoryAndProducts(decoded.userId, 'joyshop', req.body);
            // addCategoryAndProducts(decoded.userId, 'joyshop', req.body)
            //     .then(() => {
            //     return res.status(200).json({
            //         success: true,
            //         message: 'Records stored successfully',
            //     });
            //     })
            //     .catch(error => {
            //     console.error(error);
            //     return res.status(500).json({
            //         success: false,
            //         message: 'Internal Server Error',
            //     });
            //     });
         
        });
     } catch (error) {
        console.error(error);
    }
};

const updateCategoryName = async (categoryId, newCategoryName) => {
    try {
      // Find the category by ID
      const category = await Category.findById(categoryId);
  
      if (!category) {
        console.log('Category not found');
        throw new Error('Category not found');
      }
  
      // Update the category name
      category.categoryName = newCategoryName;
  
      // Save changes to the database
      await category.save();
  
      console.log('Category name updated successfully');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

const addProductToCategory = async (categoryId, productDetails, imagePath) => {
    try {
      // Find the category by ID
      const category = await Category.findById(categoryId);
  
      if (!category) {
        console.log('Category not found');
        throw new Error('Category not found');
      }
  
      // Create the product
      const product = await Product.create({
        name: productDetails.name,
        price: productDetails.price,
        returnable: productDetails.returnable,
        count: productDetails.count,
        image : imagePath,
        // ... other product fields
      });
  
      // Add the product to the category
      category.productID.push(product._id);
      
      // Save changes to the database
      await category.save();
  
      console.log('Product added to the category successfully');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

exports.vendorGetCategory = async (req, res) => {
    try {
        // Get data from the request body
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
            const vendorId = decoded.userId;
            const vendor = await Vendor.findById(vendorId)
            .populate({
                path: 'shop',
                populate: {
                path: 'category',
                populate: {
                    path: 'productID',
                    options: { strictPopulate: false },
                },
                },
            });



              if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
              }

           //   console.log('test',vendor.shop);
              const shop = vendor.shop;

              if (!shop) {
                return res.status(404).json({ message: 'Shop not found for the vendor' });
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
                  price: product.price,
                  image: product.image
                  // ... other product fields
                })) : [],
              }));

            //   const formattedCategories = categories.map(category => ({
            //     id: category._id,
            //     name: category.name,
            //     products: category.product ? category.product.map(product => ({
            //       id: product._id,
            //       name: product.name,
            //       price: product.price,
            //       // ... other product fields
            //     })) : [],
            //   }));

            
            
              res.json({
                vendor: {
                  id: vendor._id,
                  name: vendor.name,
                  shop: { id: shop._id, name: shop.name, categories: formattedCategories }
                },
              });

            //   const categories = shop.category.map(category => ({
            //     id: category._id,
            //     name: category.name,
            //     product: category.product.map(product => ({
            //       id: product._id,
            //       name: product.name,
            //       price: product.price,
            //       // ... other product fields
            //     })),
            //   }));

            //   const formattedCategories = category.map(category => ({
            //     id: category._id,
            //     name: category.name,
            //     products: category.product ? category.product.map(product => ({
            //       id: product._id,
            //       name: product.name,
            //       price: product.price,
            //       // ... other product fields
            //     })) : [],
            //   }));


           //   res.json({ vendor: { id: vendor._id, name: vendor.name, shop: { id: shop._id, name: shop.name }, category } });

      
            // Do something with the 'vendor' object
      
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

exports.vendorDeleteItem = async (req, res) => {
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
    
          const vendorId = decoded.userId;
    
          try {
            const vendor = await Vendor.findById(vendorId);
    
            if (!vendor) {
              return res.status(404).json({ message: 'Vendor not found' });
            }
    
            const itemId = req.body.cat_id || req.body.product_id;
    
            if (!itemId) {
              return res.status(400).json({
                success: false,
                message: 'Invalid request format',
              });
            }
    
            if (req.body.cat_id) {
              await deleteCategoryAndProducts(itemId);
            } else if (req.body.product_id) {
              await deleteProduct(itemId);
            }
    
            return res.status(200).json({
              success: true,
              message: 'Item deleted successfully',
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


const deleteCategoryAndProducts = async (categoryId) => {
    try {
      // Find the category by ID
      const category = await Category.findById(categoryId);
  
      if (!category) {
        console.log('Category not found');
        throw new Error('Category not found');
      }
  
      // Remove all products associated with the category
      await Product.deleteMany({ _id: { $in: category.productID } });
      
      // Remove the category itself
    //   await category.remove();
      const result = await Category.findOneAndDelete({ _id: categoryId });
      console.log('Category---------',result);
      
      if (!result) {
        console.log('Category not found');
        throw new Error('Category not found');
      }
  
      // Remove the product
      console.log('Category deleted successfully');

      console.log('Category and products deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  const deleteProduct = async (productId) => {
    try {
      // Find the product by ID
    //   const result  = await Product.findByIdAndRemove(productId);
      const result = await Product.findOneAndDelete({ _id: productId });
  
      if (!result) {
        console.log('Product not found');
        throw new Error('Product not found');
      }
  
      // Remove the product
      console.log('Product deleted successfully');
  
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

const addCategoryAndProducts = async (vendorId, shopName, categoryData) => {
    try {
      // Find the vendor by ID
      const vendor = await Vendor.findById(vendorId);
  
      if (!vendor) {
        console.log('Vendor not found');
        return;
      }
  
      // Find or create the shop based on the name
      let shop = await Shop.findOne({ name: shopName });
      console.log('shop found',shop);
      if (!shop) {
        shop = await Shop.create({ name: shopName });
      }
  
      // Iterate through the category data and insert into the database
     
      console.log('category data',categoryData);

      for (const categoryName in categoryData) {
        const productData = categoryData[categoryName];
  
        // Create the category
        const category = await Category.create({ categoryName: categoryName });
  
        // Iterate through product data and insert into the database
        for (const productName in productData) {
          const productDetails = productData[productName];
  
          // Create the product
          const product = await Product.create({
            name: productName,
            price: productDetails.price,
            count: productDetails.count,
            returnable: productDetails.returnable,
            // ... other product fields
          });
  
          // Add the product to the category
          category.productID.push(product._id);
        }
        await category.save();
        // Add the category to the shop
        shop.category.push(category._id);
      }
  
      // Save changes to the database
      await shop.save();
     
  
      // Associate the shop with the vendor
      vendor.shop = shop._id;
      await vendor.save();
  
      console.log('Category and product data added successfully');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., return an error response
    }
  };

exports.validateTokenVendor = async (req, res) => {
    try {
        // Get data from the request body
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader ? authorizationHeader.substring('Bearer '.length) : null;
      
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not provided for vendor',
            });
        }
      
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token for vendor',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Validated Vendor token successfully',
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
