const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const { generateToken } = require("../Utils/authUtils");

exports.vendorSignup = async (req, res) => {
    try {
        // Get data from the request body
        const { name, contactNo, contactMail, password, shopData } = req.body;

        console.log(req.file);
        console.log(req.body);
        console.log(name);
        console.log(contactNo);
        console.log(contactMail);
        console.log(password);
        console.log(shopData);
        // console.log(addressData);
        console.log(shopData.addressData);
        addressData = shopData.addressData;

        // const upload = cloudinary.uploader.upload('C:\\Users\\jaick\\Downloads\\world.jpeg', function(error, result) {
        //     if (error) {
        //       console.error(error);
        //     } else {
        //       console.log(result);
        //       // `result` contains information about the uploaded image
        //     }
        //   });
        // console.log(upload);

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

        // Create entry for Address
        const address = await Address.create(addressData);

        // Create entry for Shop with reference to the Address
        const shop = await Shop.create({
            name: shopData.name,
            shopDescription: shopData.shopDescription,
            image:shopData.image,
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
};


// Vendor Login route handler
exports.vendorLogin = async (req, res) => {
    try {
        // Get data from the request body
        const { contactMail, password } = req.body;

        // Find the vendor by email
        const vendor = await Vendor.findOne({ contactMail });

        // Check if the vendor exists
        if (!vendor) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials, vendor does not exists',
            });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, vendor.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials, ID and password does not match',
            });
        }

        // If authentication is successful, you may generate a token and send it in the response
        // For simplicity, let's assume you have a function generateToken(vendor) for this purpose
        const token = generateToken(vendor,'Vendor');
        const options = {
            expires : new Date(Date.now() + 2 * 60 * 60 * 1000),
            httpOnly : true,
        };
        res.cookie("token", token, options).status(200).json({
            success: true,
            message: 'Vendor logged in successfully',
            vendor,
            token,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login failed, please try again later',
        });
    }
};
