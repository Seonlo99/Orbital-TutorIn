import React, { useState, useRef, useEffect } from 'react'
import {useMutation} from "@tanstack/react-query"
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

import MainLayout from '../components/MainLayout'
import Tiptap from '../components/TipTap'
import { newPost } from '../services/index/posts'

const CreatePostPage = () => {
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    useEffect(()=>{
        if(!userState.userInfo){ //user not logged in
            navigate("/login");
        }
    },[navigate, userState.userInfo])
    

    const [content, setContent] = useState({})
    const titleRef = useRef(null);
    // const [title, setTitle] = useState("")
    
    const {mutate, isLoading} = useMutation({
        mutationFn: ({title,content,token})=>{
          return newPost({title,content,token});
        },
        onSuccess: (data) => {
            navigate("/discuss"); // change to single post page later on
        },
        onError: (error) =>{
          toast.error(error.message)
          // console.log(error);
        }
      });

    const handleClick = ()=>{
        console.log({title:titleRef.current.value, content})
        mutate({title: titleRef.current.value, content, token: userState.userInfo.token})
    }
  return (
  <MainLayout>
    <div className='container mx-auto max-w-2xl mt-10 '>

        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>

        <div className="editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <input ref={titleRef} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text"></input>
            
            <Tiptap setContent={setContent}/>

            <div className="icons flex text-gray-500 m-2"></div>

            <div className="buttons flex">
            <button onClick={()=>navigate('/discuss')} className="border border-gray-300 p-1 px-4 font-semibold text-gray-500 ml-auto">Cancel</button>
            <button onClick={handleClick} className="border border-indigo-500 p-1 px-4 font-semibold text-gray-200 ml-2 bg-indigo-500">Post</button>
            </div>
        </div>
        
        <section>
            
        </section>
    </div>

  </MainLayout>
  )
}

export default CreatePostPage