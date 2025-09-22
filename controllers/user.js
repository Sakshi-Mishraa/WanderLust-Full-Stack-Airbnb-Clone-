//user model
const User=require("../models/user.js");

//new route 
const renderSignUpForm=(req,res)=>{
    res.render("users/signUp.ejs");
}

//create route 
const SignUpUser=async(req,res,next)=>{
    try{
        let{username,email,password}=req.body;
        let newUser=new User({
            username:username,
            email:email
    });
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome To WanderLust");
        res.redirect("/listings");
    });
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

//login user 
const renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

//authenticate user 
const LoginUser=async(req,res)=>{
            req.flash("success","Welcome back to WanderLust");
            let redirectUrl=res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
  }

// logout user 
const LogoutUser=(req,res,next)=>{
   req.logout((err)=>{
    if(err){
        return next(err); 
    } 
    req.flash("success","You are logged out now");
    res.redirect("/listings");
   });
}

module.exports={renderSignUpForm,SignUpUser,renderLoginForm,LoginUser,LogoutUser}