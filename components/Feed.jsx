'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import Card from './Card'
const SambatList=({data,handleTagClick})=>{
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((sambat)=>(
                <Card key={sambat._id} post={sambat} handleTagClick={handleTagClick}/>
            ))}
        </div>
    )
}


const Feed = () => {
    const [searchText,setSearchText]=useState('')
    const[posts,setPosts]=useState([])



    useEffect(()=>{
        const fetchPost=async()=>{
            const response=await fetch('/api/sambat')
            const data=await response.json()
            setPosts(data)
        }
        fetchPost()
    },[])

    const SeparatorComponent = (inputString ) => {
        const separateUsernameHashtag = (query) => {
          const hashtagIndex = query.indexOf('#');
      
          if (hashtagIndex !== -1) {
            const username = query.slice(0, hashtagIndex).trim();
            const hashtag = query.slice(hashtagIndex).trim();
            
            return { username, hashtag };
          } else {
            // If no hashtag is found, consider the entire string as the username and set hashtag as null
            return { username: query.trim(), hashtag: null };
          }
        };
        const result=separateUsernameHashtag(inputString)
        return result
      
    }
    const handleTextOnChange=(e)=>{
        setSearchText(e.target.value)
        if (searchText.length==0){
            const fetchPost=async()=>{
                const response=await fetch('/api/sambat')
                const data=await response.json()
                setPosts(data)
            }
            fetchPost()
        }
    }
    const handleQuery=async()=>{
        const hashtagRegex = /#\w+/g;
        const hashtagsArray = searchText.match(hashtagRegex);
        try{
            const response= await fetch('/api/query',{
                method:'POST',
                body:JSON.stringify({
                    hashTag:hashtagsArray
                })
            })
            if(response.ok){
                const posts=await response.json()
                setPosts(posts)
                console.log(posts)
            }
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input type='text' placeholder='Search for a tag ' value={searchText} onChange={handleTextOnChange} className='search_input peer'/>
            <button type='button' className='black_btn mx-3' onClick={handleQuery}>Search</button>
        </form>
        <SambatList data={posts} handleTagClick={()=>{}}/>
    </section>
  )
}

export default Feed