import { connectToDB } from "@utils/database";
import Sambat from "@model/sambat";

export const GET=async (request,{params})=>{
    try{
        await connectToDB()
        const sambats=await Sambat.find({creator:params.id}).populate("creator")
        return new Response(JSON.stringify(sambats),{status:200})
    } catch(error){
        return new Response('Failed to fetch all Sambat',{sattus:500})
    }
}