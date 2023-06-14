import React, {useState} from 'react'
import {useQuery, useQueryClient} from "@tanstack/react-query"
import toast from 'react-hot-toast'

import { getComments } from '../../services/index/comments'
import Comment from './Comment'

const AllComments = ({uuid,reload,userVotes,setUserVotes, voteCount, setVoteCount, setCommentCount}) => {

    // const [comments, setComments] = useState({})
    const [newReload, setNewReload] = useState(false)

    const queryClient = useQueryClient()

    const invalidate = ()=>{
      queryClient.invalidateQueries({queryKey:["comments"]})
    }

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getComments(uuid),
        queryKey: ["comments",uuid,reload],
        onSuccess: (data)=>{
            // setComments(data)
            // console.log(data)
            if(data.comments){
                data.comments.forEach(comment=>{
                  voteCount[comment._id]=comment.voteCount
                })
                setVoteCount(voteCount)
                setNewReload(cur=>{return !cur})
              }
        },
        onError: (error) =>{
            toast.error(error.message)
            // console.log(error)
        }
    })

  return (
    <div>
        {!isLoading && !isError && data.comments.map((singleComment)=>{
            return <Comment invalidate={()=>invalidate()} reload={reload} key={singleComment._id} uuid={uuid} singleComment={singleComment} userVotes={userVotes} setUserVotes={(userVotes)=>setUserVotes(userVotes)} voteCount={voteCount} setVoteCount={(count)=>setVoteCount(count)} setCommentCount={setCommentCount}/>
        })}

    </div>
  )
}

export default AllComments