import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {dbconnect} from '../../lib/db'
import {postdata} from '../../lib/model/post'

export async function POST(request,content){


    const body = await request.json()

    console.log("myproo",body)

await mongoose.connect(dbconnect)


const res = await postdata.find(body)

    return NextResponse.json({
        data:res,
        message:"post my profile"
    })
}



export async function DELETE(request,content){


    const body = await request.json()

    console.log("myproo",body)

  

await mongoose.connect(dbconnect)


const res = await postdata.deleteOne(body)

    return NextResponse.json({
        data:res,
        message:"delete my profile"
    })
}



export async function PUT(request,content){


    const body = await request.json()

    // console.log("myproo",body._id)

await mongoose.connect(dbconnect)
console.log("putt concted")

const id = {_id:body._id}
console.log(id)


const res = await postdata.findOneAndUpdate(id, body)

    return NextResponse.json({
        data:res,
        message:"Putt my profile"
    })
}