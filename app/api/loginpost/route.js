import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {dbconnect} from '../../lib/db'
import {data} from "../../lib/model/user"


export async function POST(request,content){

const body = await request.json()


await mongoose.connect(dbconnect)

console.log("login post connected")

// console.log(body)


const fil =  await data.findOne(body)

console.log("fill",fil)

// console.log(fil.password,"pass")

if(fil!=null)
{


    if(fil.password!=null)

    
    {
        return NextResponse.json({
            data:fil,
            message:"correct",
            status:true
        })
     }



     
          



}




else{
    return NextResponse.json({
        data:"Incorrect",
        message:"Incorrect",

        status:true
    })
}




   
}