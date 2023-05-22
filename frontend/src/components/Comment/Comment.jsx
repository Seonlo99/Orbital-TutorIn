import React, { useState } from 'react'
import moment from 'moment'
import { useSelector } from "react-redux";
import {newComment} from '../../services/index/comments'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useQuery} from "@tanstack/react-query"

import AddComment from './AddComment';
import { getComments } from '../../services/index/comments'

const Comment = ({singleComment, uuid}) => {

  const [showReply, setShowReply] = useState(false)
  const userState = useSelector((state) => state.user);
  const [reload,setReload] = useState(false)

  const replyHandler = ()=>{
    setShowReply((cur)=>{
      return !cur
    })
    // console.log(showReply)
  }

  const {data, isLoading, isError} = useQuery({
    queryFn: () => getComments(uuid, singleComment._id),
    queryKey: ["comments",uuid,singleComment,reload],
    onSuccess: (data)=>{
        // setComments(data)
        // console.log(data)
    },
    onError: (error) =>{
        toast.error(error.message)
        // console.log(error)
    }
  })



  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyUser }) => {
        return newComment({ token, desc, slug, parent, replyUser });
      },
      onSuccess: () => {
        toast.success(
          "Comment Added!"
        );
        setShowReply(false)
        setReload((cur)=>!cur)
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const addCommentHandler = (text, parent = null, replyUser = null) => {
    mutateNewComment({
      desc: text,
      parent: singleComment._id,
      replyUser: singleComment.userId,
      token: userState.userInfo.token,
      slug: uuid,
    }
    );
    // setAffectedComment(null);
    // console.log(text);
};

  return (
    
    <div className='bg-gray-50 rounded-md px-3 py-2 mt-3 border-l'>
        <div className='text-xs'>{singleComment.userId.username} • {moment(singleComment.createdAt).format('DD/MM/yyyy')} {moment(singleComment.createdAt).format('HH:mm')}</div>
        <div className='mt-2'>{singleComment.body}</div>
        <div className='font-light text-sm flex flex-row gap-x-5'>
          <div>Upvote</div>
          <button onClick={replyHandler}>Reply</button>
            
        </div>
        <div hidden={!showReply} className='mt-3'>
            <AddComment label="Comment" formHandler={(text) =>addCommentHandler(text)} loading={false} />
        </div>
        {!isLoading && !isError && data.comments.map((comment)=>{
            
            return <Comment key={comment._id} uuid={uuid} singleComment={comment} />
        })}
        
    </div>
  )
}

export default Comment