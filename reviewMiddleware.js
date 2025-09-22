const ExpressError=require("./utils/ExpressError.js");
const {reviewSchema}=require("./schema.js"); 
const Review=require("./models/review.js");
// function to make joi validation as middleware for reviews
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        next(new ExpressError(400,error));
    }
    else{
        next();
    }
};


const isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currentUser._id)){
        req.flash("error","You don't have permission to perform this operation");
        return res.redirect(`/listings/${id}`);
    } 
    next();
}

module.exports={validateReview,isReviewAuthor};