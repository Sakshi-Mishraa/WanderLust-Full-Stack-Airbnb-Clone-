// using exported Listing Model
const Listing=require("../models/listing.js");

//index route
const index=async(req,res)=>{
    let allListings=await Listing.find();
    res.render("./listings/index.ejs",{allListings});
}

//new route 
const renderNewForm=(req,res)=>{
    // console.log(req.user);
    res.render("./listings/new.ejs");
}

//create route 
const createListing=async(req,res,next)=>{
        let{title,description,image,price,location, country}=req.body;
        let newListing=new Listing({
        title:title,
        description:description,
        image:[],
        price:price,
        location:location,
        country:country
    });
    newListing.owner=req.user._id;
    for(let file of req.files){
        let url=file.path
        let filename=file.filename
        newListing.image.push({url,filename});
    }
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}

//show route
const showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        }, 
    }).populate("owner");
    if(!listing){
        req.flash("error","The listing you are trying to access does not exists");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
}

//edit route
const renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","The listing you are trying to edit does not exists");
        res.redirect("/listings");
    }
    // let originalImageUrl = listing.image.url;
    // originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing});
}

//update route
const updateListing=async(req,res)=>{
    let {id}=req.params;
    let{title,description,price,location, country}=req.body;
    let listing=await Listing.findByIdAndUpdate
    (id ,
        {
            title:title,
            description:description,
            price:price,
            location:location,
            country:country
        } ,
        {
            runValidators:true,
            new:true
        }
    );
    //if no file is chosen for image i.e. user do not want to change the listing image so for this case we need to check if req.file exists(it exists if image file is chosen else it is undefined) if it exists then exteact url and filename from it update the image field else image field value will be same . 
    // NOTE : We will not update listing image by findByIdAndUpdate directly as there we would not be able to check this condition which will result in error if file not chosen.
    if(req.files.length>4){
        req.flash("error","You cannot add more than 4 images");
        return res.redirect(`/listings/${id}`);
    }
    if(req.files){
        listing.image=[];//deleting previous images 
        for(let file of req.files){
        let url=file.path
        let filename=file.filename
        listing.image.push({url,filename});
    }
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

//delete route
const deleteListing=async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}

module.exports={index,renderNewForm,createListing,showListing,renderEditForm,updateListing,deleteListing};