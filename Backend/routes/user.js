const express = require("express");
const router = express.Router();


const {userSignup, userLogin } = require("../Controllers/Auth");
const {vendorSignup, vendorLogin} = require("../Controllers/vendorAuth");

router.post("/login",userLogin);
router.post("/signup", userSignup);
//router.post("/ChangePassword", userchangePassword); 
//router.post("/getShopList", userchangePassword);   
// router.post("/getProductList", userchangePassword); 
// router.post("/searchProduct", userchangePassword); 
// router.post("/addToCart", userchangePassword);
// router.post("/payment", userchangePassword);
// router.post("/orderHistory", userchangePassword);
// router.post("/cancleOrder", userchangePassword);

router.post("/vendor/login",vendorLogin);
router.post("/vendor/signup", vendorSignup);
// router.post("/vendor/addProduct",vendorLogin);
// router.post("/vendor/getOrderHistory",vendorLogin);
// router.post("/vendor/updateProduct",vendorLogin);
// router.post("/vendor/acceptOrder",vendorLogin);
// router.post("/vendor/updateOrderStatus",vendorLogin);

module.exports = router;