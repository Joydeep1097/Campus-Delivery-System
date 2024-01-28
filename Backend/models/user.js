const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    contactNo: { 
        type: String, 
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
    // image: {
    //     type: String,
    //     required: true
    // },
});

module.exports = mongoose.model('user', userSchema);
