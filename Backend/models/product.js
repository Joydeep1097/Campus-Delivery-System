const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    description: {
        type: String,
    },
    image: { 
        type:String,
        required: true, 
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 9999999999, // Assuming 10 digits for the price
    },
    count: {
        type: Number,
        required: true,
        min: 1,
    },
    returnable: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    rating : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Rating",
        }
    ],
});

module.exports = mongoose.model('Product', productSchema);
