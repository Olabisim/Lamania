import Post from "@/models/Post";
import connect from "@/utils/db"
import { NextResponse } from "next/server"



export const GET = async (request, {params : {id}}) => {

    try {

        await connect();
        
        const singlePost = await Post.findById(id)

        return new NextResponse(JSON.stringify(singlePost), {status: 200})

    }
    catch(err) {
        
        return new NextResponse("Database Error", {status: 500})
    }
}

export const DELETE = async (request, {params : {id}}) => {

    try {

        await connect();
        
        await Post.findByIdAndDelete(id)

        return new NextResponse(JSON.stringify("Post has been deleted."), {status: 200})

    }
    catch(err) {
        
        return new NextResponse("Database Error", {status: 500})
    }
}
