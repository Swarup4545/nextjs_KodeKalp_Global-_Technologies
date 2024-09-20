import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a username"],
    },
    verification: {
        type: String,
        required:[true,"Please provide a verify"]
   },
    verified:{
        type:Boolean,
        default:false,
    },
    
    forgoPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    ceryfyToken:String,
    verifyTokenExpiry:Date,
})

const User=mongoose.models.users || mongoose.model("users",userSchema);

export default User;