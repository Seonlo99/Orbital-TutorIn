import React, {useState} from 'react'
import {useQuery} from "@tanstack/react-query"
import toast from 'react-hot-toast'

import { getComments } from '../../services/index/comments'
import Comment from './Comment'

const AllComments = ({uuid,reload}) => {

    // const [comments, setComments] = useState({})

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getComments(uuid),
        queryKey: ["comments",uuid,reload],
        onSuccess: (data)=>{
            // setComments(data)
            // console.log(data)
        },
        onError: (error) =>{
            toast.error(error.message)
            // console.log(error)
        }
    })

  return (
    <div>
        {!isLoading && !isError && data.comments.map((singleComment)=>{
            return <Comment reload={reload} key={singleComment._id} uuid={uuid} singleComment={singleComment} />
        })}

    </div>
  )
}

export default AllComments