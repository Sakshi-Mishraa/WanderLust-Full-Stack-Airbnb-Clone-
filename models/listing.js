const mongoose=require("mongoose");
const Review=require("./review.js");
//listing schema
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        // required:true,
    },
    description:{
        type:String,
    },
    image:[{
        url:String,
        filename:String
    }],
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
});

//post mongoose middleware to delete reviews from Reviews model in database as soon as listing is deleted 
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});
//creating collection (model)
const Listing=mongoose.model("Listing",listingSchema);
//exporting collection (model)
module.exports=Listing;
 
