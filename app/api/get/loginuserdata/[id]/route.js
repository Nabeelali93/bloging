import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {dbconnect} from '../../../../lib/db'
import {data } from '../../../../lib/model/user'


export async function GET(request,content){

const id = content.params.id

console.log(id)

await mongoose.connect(dbconnect)

console.log("get connected")

const filter = {_id:id}
const result = await data.findOne(filter)


    return NextResponse.json({
        data:result,
        status:"true"
    })
}


export async function PUT(request,content){

    const id = content.params.id
    
    console.log(id)
    
    await mongoose.connect(dbconnect)
    
    console.log("get connected")
    
    const filter = {_id:id}
    const result = await data.findOneAndUpdate(filter)
    
    
        return NextResponse.json({
            data:result,
            status:"true"
        })
    }