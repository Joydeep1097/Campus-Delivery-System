const express = require("express");
const router = express.Router();


const {userSignup, userLogin } = require("../Controllers/Auth");
const {vendorSignup, vendorLogin} = require("../Controllers/vendorAuth");

const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const bcrypt = require("bcrypt");

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
// router.post("/vendor/signup", vendorSignup);
router.post("/vendor/signup", upload.single("image"), async (req, res) => {

      try {
        // Get data from the request body
        // const { name, contactNo, contactMail, password, shopData } = req.body;
        // console.log(req.body);
        // console.log(name);
        // console.log(shopData);

        const { name, contactNo, contactMail, password, shopData } = req.body;
        const { name: shopName, shopDescription, addressData } = shopData;
        const { streetAddress, pincode, houseNo, state, city } = addressData;

        // addressData = shopData.addressData;
        // Validate required fields
        if (!name || !contactNo || !contactMail || !password || !shopData || !addressData) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if vendor already exists
        const existingVendor = await Vendor.findOne({ contactMail });

        if (existingVendor) {
            return res.status(400).json({
                success: false,
                message: 'Vendor already exists',
            });
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password',
            });
        }

        //Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create entry for Address
        const address = await Address.create(addressData);

        // Create entry for Shop with reference to the Address
        const shop = await Shop.create({
            name: shopData.name,
            shopDescription: shopData.shopDescription,
            image:result.url, //cloudinary url
            addressId: address._id, // Reference to the created Address
        });

        // Create entry for Vendor with reference to the created Shop
        const vendor = await Vendor.create({
            name,
            contactNo,
            contactMail,
            password: hashedPassword,
            shop: shop._id, // Reference to the created Shop
        });

        return res.status(201).json({
            success: true,
            message: 'Vendor created successfully',
            vendor,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Vendor cannot be registered, please try again later',
        });
    }
});
// router.post("/vendor/addProduct",vendorLogin);
// router.post("/vendor/getOrderHistory",vendorLogin);
// router.post("/vendor/updateProduct",vendorLogin);
// router.post("/vendor/acceptOrder",vendorLogin);
// router.post("/vendor/updateOrderStatus",vendorLogin);

module.exports = router;