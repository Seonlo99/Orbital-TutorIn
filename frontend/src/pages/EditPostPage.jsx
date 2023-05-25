import React, { useState, useRef, useEffect } from 'react'
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import MainLayout from '../components/MainLayout'
import { editPost } from '../services/index/posts'
import PostForm from '../components/PostForm'
import { getSinglePost } from '../services/index/posts'

const EditPostPage = () => {
    const {uuid} = useParams();

    // const [initialContent, setInitialContent] = useState({})
    
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    useEffect(()=>{
        if(!userState.userInfo){ //user not logged in
            navigate("/login");
        }
    },[])

    const {data, isLoading: isDataLoading, isError: isDataError} = useQuery({
      queryFn: () => getSinglePost(uuid),
      queryKey: ["post"],
      onSuccess:(data)=>{
        // setInitialContent(data.post)
        // console.log(data.post)
        if(userState.userInfo._id !== data.post.userId._id){ //check if the user is owner of the post
          navigate(-1);
        }
      },
      onError: (error) =>{
          toast.error(error.message)
          // console.log(error)
      }
  })

    const {mutate, isLoading} = useMutation({
        mutationFn: ({title,content})=>{
          return editPost({title, content, token:userState.userInfo.token, uuid});
        },
        onSuccess: (data) => {
            toast.success("Post Edited!")
            navigate(`/post/${data.post.slug}`); // change to single post page later on
        },
        onError: (error) =>{
          toast.error(error.message)
          // console.log(error);
        }
      });

      const handleMutate = (title,content)=>{
          mutate({title,content})
      }

    // console.log(content)
  return (
  <MainLayout>
    {!isDataLoading && !isDataError && (
      <PostForm handleMutate={({title,content})=>{handleMutate(title,content)}} btnName="Edit" initialContent={data.post} />
    )}
    
  </MainLayout>
  )
}

export default EditPostPage