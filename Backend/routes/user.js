const express = require("express");
const router = express.Router();


const { userSignup, userLogin } = require("../Controllers/Auth");
const { vendorSignup, vendorLogin} = require("../Controllers/vendorAuth");
const { userGetShopCProducts } = require("../Controllers/user");

const {vendorCategory, vendorGetCategory, vendorAddProduct, vendorDeleteItem, vendorUpdateCategoryName,vendorUpdateProductDetail} = require("../Controllers/vendor");


const upload = require("../middlewares/multer");

router.post("/login",userLogin);
router.post("/signup", userSignup);
router.post("/shop", userGetShopCProducts);

router.get("/allProductperCategoryShop",vendorGetCategory);
//router.post("/ChangePassword", userchangePassword); 
//router.post("/getShopList", getShopList);   
// router.post("/getProductList", userchangePassword); 
// router.post("/searchProduct", userchangePassword); 
// router.post("/addToCart", userchangePassword);
// router.post("/payment", userchangePassword);
// router.post("/orderHistory", userchangePassword);
// router.post("/cancleOrder", userchangePassword);

router.post("/vendor/login",vendorLogin);
router.post("/vendor/signup",upload.single("image"), vendorSignup);
router.post("/vendor/addcategoryproduct",vendorCategory);
router.post("/vendor/add-product",vendorAddProduct);  //given the category name
router.delete("/vendor/delete-item",vendorDeleteItem);
router.post("/vendor/update-category-name",vendorUpdateCategoryName);
router.post("/vendor/update-product-details",vendorUpdateProductDetail);
// router.post("/vendor/addProduct",vendorLogin);
// router.post("/vendor/getOrderHistory",vendorLogin);
// router.post("/vendor/updateProduct",vendorLogin);
// router.post("/vendor/acceptOrder",vendorLogin);
// router.post("/vendor/updateOrderStatus",vendorLogin);





module.exports = router;