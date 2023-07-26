'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter,useSearchParams} from 'next/navigation'
import Form from '@components/Form'
const EditSambat = () => {
    const router=useRouter()
    const searchParams=useSearchParams()
    const sambatId=searchParams.get('id')
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        title:'',
        sambat:'',
        tag:''
    })

    useEffect(()=>{
        const getSambatDetails=async()=>{
            const response=await fetch(`/api/sambat/${sambatId}`)
            const data=await response.json()
            setPost({
                sambat:data.sambat,
                tag:data.tag
            })
        }
        if(sambatId)getSambatDetails()
    },[sambatId])

    const updateSambat=async(e)=>{
        e.preventDefault()
        setSubmitting(true)
        if(!sambatId) return alert('Sambat ID Not Found')
        try{
            const response=await fetch(`/api/sambat/${sambatId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    sambat:post.sambat,
                    tag:post.tag
                })
            })
            if(response.ok){
                router.push('/')
            }
        }catch(error){
            console.log(error)
        }finally{
            setSubmitting(false)
        }
    }
  return (
    <Form type={'Edit'} post={post} setPost={setPost} submitting={submitting} handleSubmit={updateSambat}/>
  )
}

export default EditSambat