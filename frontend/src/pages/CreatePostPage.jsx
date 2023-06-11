import React, { useState, useRef, useEffect } from 'react'
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

import MainLayout from '../components/MainLayout'
import Tiptap from '../components/TipTap'
import { newPost } from '../services/index/posts'
import PostForm from '../components/PostForm'
import {getAllTags} from "../services/index/tags"

const CreatePostPage = () => {
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    useEffect(()=>{
        if(!userState.userInfo){ //user not logged in
            navigate("/login");
        }
    },[navigate, userState.userInfo])

    const {mutate, isLoading} = useMutation({
        mutationFn: ({title, content, token, selectedTags})=>{
          return newPost({title, content, token, selectedTags});
        },
        onSuccess: (data) => {
            toast.success("Post Created!")
            navigate(`/post/${data.post.slug}`); // change to single post page later on
        },
        onError: (error) =>{
          toast.error(error.message)
          // console.log(error);
        }
      });

      const handleMutate = (title,content, selectedTags)=>{
          mutate({title, content, token:userState.userInfo.token, selectedTags})
      }



    // console.log(content)
  return (
  <MainLayout>
    <PostForm handleMutate={({title,content,selectedTags})=>{handleMutate(title,content,selectedTags)}} btnName="Post" />
  </MainLayout>
  )
}

export default CreatePostPage