const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    streetAddress: { 
        type: String, 
        required: true 
    },
    houseNo: { 
        type: Number, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    pincode: { 
        type: Number, 
        required: true 
    },
});

module.exports = mongoose.model('Address', addressSchema);
