// using exported Listing Model
const Listing=require("../models/listing.js");
// using exported Reviews Model
const Review=require("../models/review.js");

//create route
const createReview=async(req,res)=>{
    //getting listing for which review is posted via form
    let listing=await Listing.findById(req.params.id);
    let {rating,comment}=req.body;
    let newReview=new Review({
        comment:comment,
        rating:rating
    });
    newReview.author=req.user._id;
    // in reviews field of listing we found we are pushing the new review obtained from form for this listing
    listing.reviews.push(newReview);
    //saving listing in db 
    await listing.save();
    //saving newReview in db
    await newReview.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
}

//delete route 
const deleteReview=async(req,res)=>{
    let {id, reviewId}=req.params;
    //deleting review from reviews collection
    await Review.findByIdAndDelete(reviewId);
    //deleting review from reviews array of listing uding pull operator
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}


module.exports={createReview,deleteReview};