import connect from "@/utils/db";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export const POST = async (request) => {

    try {
        const {name, email, password} = await request.json();

        await connect();
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User(
            {
                name, 
                email,
                password: hashedPassword
            }
        )
    
        await User.save(newUser)

        if(!newUser) return new NextResponse(JSON.stringify({message: 'user not created, please try again'}), {status: 500})
        
    
        return new NextResponse(JSON.stringify("user has been created"), {status: 201})
    }

    catch(err) {
        return new NextResponse(err.message, {status: 500})
    }

}
