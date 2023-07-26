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

    const handleTextChange=(e)=>{
        setSearchText(e.target.value)
    }

    useEffect(()=>{
        const fetchPost=async()=>{
            const response=await fetch('/api/sambat')
            const data=await response.json()
            setPosts(data)
        }
        fetchPost()
    },[])

    
  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input type='text' placeholder='Search for a tag or a username' value={searchText} onChange={handleTextChange} className='search_input peer'/>
        </form>
        <SambatList data={posts} handleTagClick={()=>{}}/>
    </section>
  )
}

export default Feed