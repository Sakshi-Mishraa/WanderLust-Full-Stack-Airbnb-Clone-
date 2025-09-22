const express=require("express");
//router object
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
//all middleware functions
const {validateListing,isLoggedIn,isOwner}=require("../listingMiddleware.js");
//multer 
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});  
  
//listing controller 
const listingController=require("../controllers/listing.js");

router.route("/")
.get(wrapAsync(listingController.index))//index route 
.post(
    isLoggedIn,
    upload.array('image') ,
    validateListing,
    wrapAsync(listingController.createListing)
);//create route 

//new route for listings
router.get("/new",isLoggedIn,listingController.renderNewForm); 

router.route("/:id")
.get(wrapAsync(listingController.showListing))//show route
.put(
    isLoggedIn,
    isOwner,
    upload.array('image') ,
    validateListing,
    wrapAsync(listingController.updateListing)
) //update route
.delete(isLoggedIn,isOwner,
    wrapAsync(listingController.deleteListing ));//delete route 
 
//edit route for listings 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//exporting router object
module.exports=router;