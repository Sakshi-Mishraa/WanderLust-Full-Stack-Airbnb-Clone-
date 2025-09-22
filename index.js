// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const express= require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
//requiring router object exported from routes(listing.js)
const listingRouter=require("./routes/listing.js");
//requiring router object exported from routes(review.js)
const reviewRouter=require("./routes/review.js");
//requiring router object exported from routes(user.js)
const userRouter=require("./routes/user.js");
//express-session
const session=require("express-session");
// mongo-connect for session storage
const MongoStore = require("connect-mongo");
//flash
const flash=require("connect-flash");
//passport
const passport=require("passport"); 
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public"))); 
//setting our database 
const dbUrl=process.env.ATLAS_DB_URL;

const mongoose=require("mongoose");
async function main() {
    await mongoose.connect(dbUrl);
  }
  main()
  .then(()=>{
      console.log("connection successful to db");
  })
  .catch(err => console.log(err));

// mongo store
const mongoStore=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SESSION_SECRET
    },
    touchAfter:24*3600,
});

mongoStore.on("error",()=>{
    console.log("Error in mongo session store");
})
//session options
const sessionOptions={
    store:mongoStore,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
};

//root route
app.get("/",(req,res)=>{
    console.log(req.session);
    res.send("hii , i m root");
});

//session middleware
app.use(session(sessionOptions));
// flash middleware 
app.use(flash());

//passport initialize middleware 
app.use(passport.initialize());
//passport session middleware 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

//middleware to flash message using res.locals / storing imp info in res.locals
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error"); 
    res.locals.currentUser=req.user; 
    next();
});

//listing routes 
app.use("/listings",listingRouter);

//review routes 
app.use("/listings/:id/reviews",reviewRouter);

//user routes
app.use("/",userRouter); 

//middleware that handles error for the routes that does not exists 
// app.use((req,res,next)=>{
//     // res.send("page not found");
//     next(new ExpressError(404,"Page Not Found"));
// });

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found!"));
// });
app.get("*",(req,res)=>{
    res.send("page not found");
});
//error handling middleware 
app.use((err,req,res,next)=>{
    let{statusCode,message}=err;   
   res.status(statusCode||500).render("error.ejs",{message});
}); 

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("app is listening at port 8080");
}); 

 