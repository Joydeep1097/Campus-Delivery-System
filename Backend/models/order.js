const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Timestamp: {
        type: Date,
        default: Date.now,
    },
    shopID:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Shop",
        required : true,
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            Rating: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Rating",
            },
            count: {
                type: Number,
                required: true,
                min: 1,
                max: 100,
            },
        },
    ],
    total :{
        type: Number,
        min: 1,
    }
});

module.exports = mongoose.model("Order", orderSchema);
