import { connectToDB } from "@utils/database";
import Sambat from "@model/sambat";

export const GET=async(request)=>{
    try{
        await connectToDB()
        const sambats=await Sambat.find({}).populate('creator')
        return new Response(JSON.stringify(sambats),{status:200})

    }catch(error){
        return new Response('Failed to fetch all sambatan',{status:500})
    }
}

