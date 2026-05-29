import mongoose from "mongoose";

let connectDb  =  async()=>{
    try {
         await mongoose.connect('mongodb://127.0.0.1:27017/todo-auth')
         console.log('mongodb connect');
         
    } catch (error) {
        console.log('mongodb connection failed',error);
        
    }
}

export default connectDb