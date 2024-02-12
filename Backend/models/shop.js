const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
    },
    shopDescription : {
        type : String,
    },
    image: { 
        type:String, 
    },
    addressId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address', 
    },
    category: [ 
        { 
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Category", 
        } 
    ], 
});

module.exports = mongoose.model('Shop', shopSchema);
