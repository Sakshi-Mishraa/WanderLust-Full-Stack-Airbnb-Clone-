const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    }
}); 

userSchema.plugin(passportLocalMongoose);// This adds 'username', 'hash', and 'salt' automatically in userSchema

const User=mongoose.model("User",userSchema);

module.exports=User; 