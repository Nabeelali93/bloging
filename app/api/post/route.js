import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {dbconnect} from '../../lib/db'
import {data } from '../../lib/model/user'


export async function POST(request,content){

const body = await request.json()

     await mongoose.connect(dbconnect)
console.log("posstttt")
     console.log(body.name)


   const filter = await data(body)
        const result = filter.save()

    return NextResponse.json({
        data:result,
        status:true,
        message:"post"
    })
}




    