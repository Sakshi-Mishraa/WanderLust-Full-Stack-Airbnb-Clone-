//function to be passed as middeware to save the redirect url before passport.authenticate middleware executes
const saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports=saveRedirectUrl;