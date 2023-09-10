import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {dbconnect} from '../../lib/db'
import { postdata } from "@/app/lib/model/post";
   



   export async function POST(request,content){

    const body = await request.json()



await mongoose.connect(dbconnect)
console.log("nfpost connected")


const data = await postdata(body)


const result = await data.save()

    return NextResponse.json({
        data:result,
        status:true
    })
   }