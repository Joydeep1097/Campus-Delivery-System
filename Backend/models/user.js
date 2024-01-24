const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    contactNo: { 
        type: Number, 
        required: true 
    },
    contactMail: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    addressId: [
        { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address', 
        required: true 
        }
    ],
    orders: [ 
        { 
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Order", 
        } 
    ], 
});

module.exports = mongoose.model('user', userSchema);
