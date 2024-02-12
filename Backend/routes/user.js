const express = require("express");
const router = express.Router();

const { userSignup, userLogin ,getShopList } = require("../Controllers/Auth");
const { vendorSignup, vendorLogin} = require("../Controllers/vendorAuth");
const { userGetShopCProducts} = require("../Controllers/user");
const { addToCart, updateProductCountInCart, deleteProductFromCart, getUserCartProducts} = require("../Controllers/Cart");
const { vendorCategory, vendorGetCategory, vendorAddProduct, vendorDeleteItem, vendorUpdateCategoryName,vendorUpdateProductDetail} = require("../Controllers/vendor");

const upload = require("../middlewares/multer");

router.post("/login",userLogin);
router.post("/signup", userSignup);
router.post("/shop", userGetShopCProducts);
router.get("/allProductperCategoryShop",vendorGetCategory);
//router.post("/ChangePassword", userchangePassword); 
router.post("/getShopList", getShopList);  
router.post("/addToCart",addToCart); 
router.post("/updateProductCountInCart",updateProductCountInCart); 
router.get("/getUserCartProducts",getUserCartProducts); 
router.post("/deleteProductFromCart",deleteProductFromCart); 


// router.post("/payment", userchangePassword);
// router.post("/rating", userchangePassword);
// router.post("/cancleOrder", userchangePassword);

router.post("/vendor/login",vendorLogin);
router.post("/vendor/signup",upload.single("image"), vendorSignup);
router.post("/vendor/addcategoryproduct",vendorCategory);
router.post("/vendor/add-product",vendorAddProduct);  //given the category name
router.delete("/vendor/delete-item",vendorDeleteItem);
router.post("/vendor/update-category-name",vendorUpdateCategoryName);
router.post("/vendor/update-product-details",upload.single("image"), vendorUpdateProductDetail);

// router.post("/vendor/acceptOrder",vendorLogin);
// router.post("/vendor/updateOrderStatus",vendorLogin);





module.exports = router;
