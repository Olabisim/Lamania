
import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs'




const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // from the video found credentials provider but I am using credentials
        Credentials({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials){
                await connect()
                try {
                    const user = await User.findOne({email: credentials.email})

                    if(user) {
                        // check password
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                        if(isPasswordCorrect) return user
                        else throw new Error("email or password not correct!");
                    }
                    else {
                        throw new Error("User not found!");
                    }
                } catch(err) {
                    throw new Error(err)
                }
            }
        })
    ],
    pages: {
        error: "/dashboard/login",
    }
})

export { handler as GET, handler as POST }

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         })
//     ]
// })

