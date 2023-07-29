import { connectToDB } from "@utils/database"
import Sambat from "@model/sambat"

export const POST= async(request)=>{
    const {hashTag}=await request.json()
    try{
        await connectToDB()
        const searchQuery = {
            tag:{ $in: hashTag.map((hashtag) => new RegExp(hashtag, "i")) }
          };      
        const posts= await Sambat.find(searchQuery).populate('creator')
        return new Response(JSON.stringify(posts),{status:200})
    }catch(error){
        return new Response('Failed to find posts',{status:500})
    }
}