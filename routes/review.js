const express=require("express");
//router object
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");


//requiring midddlewares 
const {validateReview,isReviewAuthor}=require("../reviewMiddleware.js");
const {isLoggedIn}=require("../listingMiddleware.js");

//review controller 
const reviewController=require("../controllers/review.js");

//Create route for reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete route for review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview)); 

//exporting router object
module.exports=router;