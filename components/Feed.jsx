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
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if (searchText==''){
            const fetchPost=async()=>{
                const response=await fetch('/api/sambat')
                const data=await response.json()
                setPosts(data)
            }
            fetchPost()
        }else{
            handleQuery()
        }
    },[searchText])

    
    const handleTagClick=(tag)=>{
        setSearchText(searchText+' '+tag)
        handleQuery()

    }
    
  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input type='text' placeholder='Search for a tag ' value={searchText} onChange={(e)=>setSearchText(e.target.value)} className='search_input peer'/>
            <button type='button' className='black_btn mx-3' onClick={handleQuery}>Search</button>
        </form>
        <SambatList data={posts} handleTagClick={(tag)=>{handleTagClick(tag)}}/>
    </section>
  )
}

export default Feed