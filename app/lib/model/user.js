import mongoose from "mongoose";



const userschema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:Number
})

if(mongoose.models["users"]){
    delete mongoose.models["users"]
}

export const data = mongoose.model("users", userschema)