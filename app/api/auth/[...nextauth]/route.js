import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@model/user";
import { connectToDB } from "@utils/database";

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser=await User.findOne({email:session.user.email})
            session.user.id=sessionUser._id.toString()

            return session
        },
        async signIn({ account, profile, user, credentials }){
            try{
                await connectToDB()
                const userExist=await User.findOne({email:profile.email})
                if(!userExist){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(' ',''),
                        image:profile.picture
                    })
                }
                return true
            } catch(error){
                console.log(error)
            }
        }
    }
})

export {handler as GET, handler as POST}