const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    shopDescription : {
        type : String,
        required:true,
    },
    image: { 
        type: String,
        required:true,
    },
    addressId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address', 
        required: true 
    },
    category: [ 
        { 
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Category", 
        } 
    ], 
});

module.exports = mongoose.model('Shop', shopSchema);
