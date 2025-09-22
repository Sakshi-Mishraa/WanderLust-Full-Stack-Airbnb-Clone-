const {listingSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");
const Listing=require("./models/listing.js");

// function to make joi validation as middleware for listing
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        next(new ExpressError(400,error));
    }
    else{
        next();
    }
};

// function to be passed as middleware to authenticate user before adding new listing , editing and deleting any existing listing 
const isLoggedIn=(req,res,next)=>{    
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        // res.locals.redirectUrl=req.session.redirectUrl;//we are not saving the req.session.redirecturl here in this middleware in res.locals because passport.authenticate() middleware will reset the session object after it executes successfully (hence here res.locals.redirectUrl=undefined) so we need to save the req.session.redirectUrl before passport.authenticate() middleware executes hence we have saved it in saveRedirectUrl middleware which runs before passport.authenticates() middleware 
        req.flash("error","You  must be logged in");
        return res.redirect("/login");
    }
    next();
}

// function to be passed as middleware to verify the owner of the listing in routes (protecting routes)
const isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner[0]._id.equals(res.locals.currentUser._id)){
        req.flash("error","You don't have permission to perform this operation");
        return res.redirect(`/listings/${id}`);
    } 
    next();
}

module.exports={validateListing,isLoggedIn,isOwner};