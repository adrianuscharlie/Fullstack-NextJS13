import { connectToDB } from "@utils/database";
import Sambat from "@model/sambat";

export const POST=async(request)=>{
    const {userId,sambat,tag}=await request.json()
    try{
        await connectToDB()
    const newSambat=new Sambat({
        creator:userId,
        sambat,
        tag
    })
    await newSambat.save()
    return new Response(JSON.stringify(newSambat),{status:200})
    }catch(error){
        return new Response('Failed to create new sambat',{status:500})
    }
}