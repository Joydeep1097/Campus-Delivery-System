const bcrypt = require("bcrypt");
const User = require("../models/user");
const Address = require("../models/address");
const { generateToken } = require("../utils/authUtils");
const Shop = require("../models/shop");

// User Signup route handler
exports.userSignup = async (req, res) => {
    try {
        // Get data from the request body
        const { name, contactNo, contactMail, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ contactMail });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
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
        //const address = await Address.create(addressData);

        // Create entry for User with reference to the Address
        const user = await User.create({
            name,
            contactNo,
            contactMail,
            password: hashedPassword,
            //addressId: address._id, // Reference to the created Address
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
};

// User Login route handler
exports.userLogin = async (req, res) => {
    try {
        // Get data from the request body
        const { contactMail, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ contactMail });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials, User does not exists',
            });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials, Id and Password does not match',
            });
        }

        // If authentication is successful, you may generate a token and send it in the response
        // For simplicity, let's assume you have a function generateToken(user) for this purpose
        const token = generateToken(user,'Student');
        const options = {
            expires : new Date(Date.now() + 2 * 60 * 60 * 1000),
            httpOnly : true,
        };
        const cookies = req.cookies;

        // Iterate over each cookie and clear it
        for (const cookieName in cookies) {
                res.clearCookie(cookieName);
        }

        res.cookie("token", token, options).cookie("mail", contactMail).status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
            token,
        });

        console.log(isPasswordValid);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login failed, please try again later',
        });
    }
};

/*
//change password 
exports.userchangePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match',
            });
        }

        //const userId = req.cookies.mail; 
        console.log("=============");
        console.log(req.user.contactMail);
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the old password is valid
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid old password',
            });
        }

        // Secure and update the password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        // TODO: Send email - Password updated

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update password',
        });
    }
};
*/

// User Signup route handler
exports.getShopList = async (req, res) => {
    try{
        const allShopList = await Shop.find({},{name:true,
                                                image:true,
                                                shopDescription:true,}).exec();

        return res.status(200).json({
            success:true,
            message:'Data fetched from database successfully',
            shopData:allShopList,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch shop list from database',
            error: error.message,
        });
    }
};