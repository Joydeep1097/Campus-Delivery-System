const mongoose = require("mongoose"); 

const categorySchema = new mongoose.Schema({  
    categoryName: { 
        type:String, 
        required : true,
    },
    productID : [ 
        {
            type:mongoose.Schema.Types.ObjectId, 
            required:true, 
            ref:"Product", 
        },
    ]
}); 

module.exports = mongoose.model("Category", categorySchema);