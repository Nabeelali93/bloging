import mongoose from "mongoose"


const postschema= mongoose.Schema({
    title:String,
    name:String,
    description:String,
    imagelink:String,
    userid:String
})

if(mongoose.models["posts"]){
    delete mongoose.models["posts"]
}

export const postdata = mongoose.model("posts", postschema)