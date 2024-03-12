import Post from "@/models/Post";
import connect from "@/utils/db"
import { NextResponse } from "next/server"



export const GET = async (request, {params : {id}}) => {

    try {

        await connect();
        
        const singlePost = Post.findById(id)

        return new NextResponse(JSON.stringify(singlePost), {status: 200})

    }
    catch(err) {
        
        return new NextResponse("Database Error", {status: 500})
    }
}
