import React, {useState} from 'react'
import {useQuery} from "@tanstack/react-query"
import moment from 'moment'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import parse from 'html-react-parser'
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { generateHTML } from '@tiptap/html'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Underline from "@tiptap/extension-underline"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'


import MainLayout from '../components/MainLayout'
import { getSinglePost } from '../services/index/posts'
import AddComment from '../components/Comment/AddComment'
import {newComment} from '../services/index/comments'

const PostPage = () => {
    const [body, setBody] = useState("")
    const {uuid} = useParams();
    const userState = useSelector((state) => state.user);

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getSinglePost(uuid),
        queryKey: ["post"],
        onSuccess: (data)=>{
            setBody( () => {
                return generateHTML(data.post.contents, [
                //   Document,
                //   Paragraph,
                //   Text,
                //   Bold,
                  Underline,
                  TextStyle,
                  Color,
                //   ListItem,
                  StarterKit
                  // other extensions …
                ])
              }, [data.post.contents])
        },
        onError: (error) =>{
            toast.error(error.message)
            // console.log(error)
        }
    })

    !isLoading && console.log(data)

    const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyUser }) => {
        return newComment({ token, desc, slug, parent, replyUser });
      },
      onSuccess: () => {
        toast.success(
          "Comment Added!"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

    const addCommentHandler = (text, parent = null, replyUser = null) => {
        mutateNewComment({
          desc: text,
          parent,
          replyUser,
          token: userState.userInfo.token,
          slug: data.post.slug,
        });
        // setAffectedComment(null);
        console.log(text);
    };

  return (
    <MainLayout>
        {!isLoading && !isError &&(
        <div className='container mx-auto max-w-4xl mt-10 px-5 py-5'>
            <div className='flex flex-col divide-y bg-gray-50 rounded-lg p-5'>
                <div className='mb-3'>
                    <div className='font-semibold text-2xl'>
                        {data.post.title}
                    </div>
                    <div className='font-light text-sm'>
                                    by {data.post.userId.username}, {moment(data.post.createdAt).format('DD/MM/yyyy')} | {moment(data.post.createdAt).format('HH:mm')}
                    </div>
                </div>
                
                <div className='font-semibold text-2xl pt-5 mb-5'>
                    <div className='prose lg:prose-xl prose-p:leading-none prose-p:my-0 prose-p:text-md font-normal'>
                        {parse(body)}
                    </div>
                </div>
                <div className='pt-3'>
                    UPVOTE BUTTON
                </div>
            </div>

            <div className='mt-10'>
                <AddComment label="Comment" formHandler={(text) =>addCommentHandler(text)} loading={false} />
            </div>
            
        </div>
        )}
    </MainLayout>
  )
}

export default PostPage