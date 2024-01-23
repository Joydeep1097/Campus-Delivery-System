const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
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
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    shop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Shop",
        required : true,
    },
});

module.exports = mongoose.model('vendor', vendorSchema);
