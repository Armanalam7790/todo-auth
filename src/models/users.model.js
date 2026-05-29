import mongoose from "mongoose";

let userSchema  =   mongoose.Schema({
     name:{
        type:String,
        trim:true,
        required:true
     },
      email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
     },
   
},{timestamps:true})


let UserModel  =  mongoose.model("users", userSchema)

export default UserModel