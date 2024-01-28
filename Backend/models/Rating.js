const mongoose = require("mongoose"); 

const ratingSchema = new mongoose.Schema({ 
    user: { 
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref: "User", 
    },
    rating: { 
        type:Number, 
        required:true, 
    },
}); 

module.exports = mongoose.model("Rating", ratingAndReviewSchema)