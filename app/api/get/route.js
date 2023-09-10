import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {dbconnect} from '../../lib/db'
import {postdata} from '../../lib/model/post'


export async function GET(){



await mongoose.connect(dbconnect)

console.log("get connected")


const result = await postdata.find()


    return NextResponse.json({
        data:result,
        status:"true"
    })
}