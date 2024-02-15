const express = require("express");
const router = express.Router();


const {userSignup, userLogin ,getShopList } = require("../Controllers/Auth");
const {vendorSignup, vendorLogin} = require("../Controllers/vendorAuth");
const { addToCart, updateProductCountInCart, deleteProductFromCart, getUserCartProducts} = require("../Controllers/Cart");
const { updateOrderStatus} = require("../Controllers/VendorOrderConfiguration");
const {userGetShopCProducts, validateTokenUser, razorpayPayment, searchProduct, orderHistory,orderHistoryy } = require("../Controllers/user");
const {vendorCategory, vendorGetCategory, vendorAddProduct, vendorDeleteItem, vendorUpdateCategoryName,vendorUpdateProductDetail,validateTokenVendor,vendorCreateCategory} = require("../Controllers/vendor");
const {vendorOrderHistory,vendorOrderHistoryy} = require("../Controllers/vendorOrder");
const { placeOrder } = require("../Controllers/order");

const upload = require("../middlewares/multer");

router.post("/login",userLogin);
router.post("/signup", userSignup);
router.post("/shop", userGetShopCProducts);
router.get("/validateTokenUser", validateTokenUser);
router.post("/razorpayPayment", razorpayPayment);
router.get("/allProductperCategoryShop",vendorGetCategory);
//router.post("/ChangePassword", userchangePassword); 
router.post("/getShopList", getShopList);  
router.post("/addToCart",addToCart); 
router.post("/updateProductCountInCart",updateProductCountInCart); 
router.post("/searchProduct", searchProduct); 
router.get("/getUserCartProducts",getUserCartProducts); 
router.post("/deleteProductFromCart",deleteProductFromCart);
router.post("/placeOrder",placeOrder); 

// router.post("/getProductList", userchangePassword); 
// router.post("/searchProduct", userchangePassword); 
// router.post("/addToCart", userchangePassword);
// router.post("/payment", userchangePassword);
// router.post("/orderHistory", userchangePassword);
// router.post("/cancleOrder", userchangePassword);
router.post("/orderHistory", orderHistoryy);
router.post("/vendor/login",vendorLogin);
router.post("/vendor/signup",upload.single("image"), vendorSignup);
router.post("/vendor/addcategoryproduct",vendorCategory);
router.post("/vendor/add-product", upload.single("image"), vendorAddProduct);  //given the category name
router.delete("/vendor/delete-item",vendorDeleteItem);
router.post("/vendor/update-category-name",vendorUpdateCategoryName);
router.post("/vendor/updateOrderStatus",updateOrderStatus);
router.post("/vendor/update-product-details",upload.single("image"), vendorUpdateProductDetail);
router.get("/vendor/validateTokenVendor",validateTokenVendor);
// router.post("/vendor/acceptOrder",vendorLogin);
// router.post("/vendor/updateOrderStatus",vendorLogin);
router.post("/vendor/vendorOrderHistory",vendorOrderHistoryy);
router.post("/vendor/addCategory",vendorCreateCategory);





module.exports = router;
