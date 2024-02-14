const bcrypt = require("bcrypt");
const Address = require("../models/address");
const Vendor = require("../models/vendor");
const Shop = require("../models/shop");
const Category = require("../models/category");
const Product = require("../models/product");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multer");
const { generateToken } = require("../Utils/authUtils");
const jwt = require('jsonwebtoken');
const Order = require('../models/order');



exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    if (!orderId || !newStatus) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and new status are required.',
      });
    }

    // Check if the new status is valid
    if (!['Accepted', 'Rejected', 'InTransit', 'Pending', 'Delivered'].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid new status.',
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    // Update order status
    order.status = newStatus;
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully.',
      order: order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
