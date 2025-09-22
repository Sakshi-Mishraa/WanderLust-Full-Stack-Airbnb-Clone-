const express=require("express");
//router object
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const saveRedirectUrl=require("../userMiddleware.js");
const userController=require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignUpForm)//new route 
.post(wrapAsync(userController.SignUpUser));//create route

router.route("/login")
.get(userController.renderLoginForm)//login route 
.post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login', 
        failureFlash:true
    }),userController.LoginUser);//authenticate user route 

//logout route 
router.get("/logout",userController.LogoutUser);

module.exports=router;

