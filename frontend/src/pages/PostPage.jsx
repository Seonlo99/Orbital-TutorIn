import React, {useState, useEffect} from 'react'
import {useQuery} from "@tanstack/react-query"
import moment from 'moment'
import { useParams,useNavigate } from 'react-router-dom'
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
import { getSinglePost,deletePost } from '../services/index/posts'
import AddComment from '../components/Comment/AddComment'
import {newComment} from '../services/index/comments'
import Comment  from '../components/Comment/Comment'
import AllComments from '../components/Comment/AllComments'

import { addVote, editVote, deleteVote } from '../services/index/votes'

const PostPage = () => {
    const navigate = useNavigate()
    const [body, setBody] = useState("")
    const {uuid} = useParams();
    const [reload, setReload] = useState(false)
    const [votes, setVotes] = useState({})
    const [postVoteCount, setPostVoteCount] = useState(0)
    // const [comments, setComments] = useState({})
    const userState = useSelector((state) => state.user);

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getSinglePost(uuid, userState.userInfo ? userState.userInfo._id:null),
        queryKey: ["post"],
        onSuccess: (data)=>{
            setVotes(()=>{return data.votes} )
            setPostVoteCount(()=>{return data.voteCount})
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
              // console.log(parse(body))
        },
        onError: (error) =>{
            toast.error(error.message)
            // console.log(error)
        }
    })

    // !isLoading && console.log(data)

    const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyUser }) => {
        return newComment({ token, desc, slug, parent, replyUser });
      },
      onSuccess: () => {
        toast.success(
          "Comment Added!"
        );
        setReload((cur)=>{
          return !cur
        })
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
        // console.log(text);
    };

    const { mutate: mutateDeletePost } =
    useMutation({
      mutationFn: () => {
        return deletePost({ token: userState.userInfo.token, slug: data.post.slug});
      },
      onSuccess: () => {
        toast.success(
          "Post Deleted!"
        );
        navigate('/discuss')
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

    const deleteHandler = ()=>{
      mutateDeletePost();
    }


    const { mutate: mutateAddVote, isLoading: isLoadingAddUpvote } =
    useMutation({
      mutationFn: ({ token, action, postSlug }) => {
        return addVote({ token, action, postSlug });
      },
      onSuccess: () => {
        // toast.success(
        //   "Comment Added!"
        // );
        // setReload((cur)=>{
        //   return !cur
        // })
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });


    const { mutate: mutateEditVote, isLoading: isLoadingEditUpvote } =
    useMutation({
      mutationFn: ({ token, action, postSlug }) => {
        return editVote({ token, action, postSlug });
      },
      onSuccess: () => {
        // toast.success("Edited Vote");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });


    const { mutate: mutateDeleteVote, isLoading: isLoadingdeleteUpvote } =
    useMutation({
      mutationFn: ({ token, postSlug }) => {
        return deleteVote({ token, postSlug });
      },
      onSuccess: () => {
        // toast.success("Deleted Vote");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

    const voteHandler = (action,id) => {
      
        if(!userState.userInfo){
          toast.error("Login to vote!");
          return
        }

        const value = action==='UP'?1:-1

        if(votes[id]){ //user already voted before

          if(votes[id].value===value){ //delete vote
            setPostVoteCount(cur=>{return cur-value})
            delete votes[id];
            // console.log(postVoteCount)
            setVotes(()=>{return votes})
            mutateDeleteVote({ // new vote
              token: userState.userInfo.token,
              postSlug: data.post.slug,
            });
          }
          else{
            // console.log(votes[id].value)
            // console.log(value)
            setPostVoteCount((cur)=>{
              const newValue = value === 1? cur+2: cur-2
              // console.log(newValue)
              return newValue
            })
            votes[id] = {...votes[id], value : value}
            // console.log(postVoteCount)
            setVotes(()=>{return votes})
            mutateEditVote({ // edit vote
              action: value,
              token: userState.userInfo.token,
              postSlug: data.post.slug,
            });
          }

        }
        else{
          votes[id] = {value:value}
          setVotes(votes)
          setPostVoteCount(cur=>{return cur+value})
          mutateAddVote({ // new vote
            action: value,
            token: userState.userInfo.token,
            postSlug: data.post.slug,
          });
          
        }
        // setAffectedComment(null);
        // console.log(text);
    };

    // useEffect(() => {
      
    // }, [postVoteCount,votes])

    // console.log(votes)
  return (
    <MainLayout>
        {!isLoading && !isError && body &&(
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
                <div className='pt-3 justify-between flex flex-row'>
                    <div className='bg-gray-300 rounded-2xl px-2 py-1 flex flex-row items-center gap-x-1'>
                      <div>
                          {
                            votes[data.post._id] && votes[data.post._id].value ===1 ? (
                            <button onClick={()=>voteHandler('UP', data.post._id)}>
                              <svg viewBox="0 0 20 20" height="16" width="16" fill="red">
                                <path d="M18.706 8.953L10.834.372A1.123 1.123 0 0010 0a1.128 1.128 0 00-.833.368L1.29 8.957a1.249 1.249 0 00-.17 1.343 1.114 1.114 0 001.006.7H6v6.877A1.125 1.125 0 007.123 19h5.754A1.125 1.125 0 0014 17.877V11h3.877a1.114 1.114 0 001.005-.7 1.25 1.25 0 00-.176-1.347z"></path>
                              </svg>
                            </button>) : 
                            (<button onClick={()=>voteHandler('UP', data.post._id)}>
                              <svg viewBox="0 0 20 20" height="16" width="16" fill="currentColor">
                                <path d="M12.877 19H7.123A1.125 1.125 0 016 17.877V11H2.126a1.114 1.114 0 01-1.007-.7 1.249 1.249 0 01.171-1.343L9.166.368a1.128 1.128 0 011.668.004l7.872 8.581a1.252 1.252 0 01.176 1.348 1.114 1.114 0 01-1.005.7H14v6.877A1.125 1.125 0 0112.877 19zM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8zM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016z"></path>
                              </svg>
                            </button>)
                          }
                          {/* <button onClick={()=>voteHandler('UP')}><svg viewBox="0 0 20 20" height="16" width="16" fill="currentColor">
                            <path d="M12.877 19H7.123A1.125 1.125 0 016 17.877V11H2.126a1.114 1.114 0 01-1.007-.7 1.249 1.249 0 01.171-1.343L9.166.368a1.128 1.128 0 011.668.004l7.872 8.581a1.252 1.252 0 01.176 1.348 1.114 1.114 0 01-1.005.7H14v6.877A1.125 1.125 0 0112.877 19zM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8zM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016z"></path>
                          </svg></button> */}
                          {/* M18.706 8.953L10.834.372A1.123 1.123 0 0010 0a1.128 1.128 0 00-.833.368L1.29 8.957a1.249 1.249 0 00-.17 1.343 1.114 1.114 0 001.006.7H6v6.877A1.125 1.125 0 007.123 19h5.754A1.125 1.125 0 0014 17.877V11h3.877a1.114 1.114 0 001.005-.7 1.25 1.25 0 00-.176-1.347z */}
                      </div>
                      <div>
                        {postVoteCount}
                      </div>
                      <div>
                        {
                            votes[data.post._id] && votes[data.post._id].value === -1 ? (
                            <button onClick={()=>voteHandler('DOWN', data.post._id)}>
                              <svg viewBox="0 0 20 20" height="16" width="16" fill="blue">
                                <path d="M18.88 9.7a1.114 1.114 0 00-1.006-.7H14V2.123A1.125 1.125 0 0012.877 1H7.123A1.125 1.125 0 006 2.123V9H2.123a1.114 1.114 0 00-1.005.7 1.25 1.25 0 00.176 1.348l7.872 8.581a1.124 1.124 0 001.667.003l7.876-8.589A1.248 1.248 0 0018.88 9.7z"></path>
                              </svg>
                            </button>) : 
                            (<button onClick={()=>voteHandler('DOWN', data.post._id)}>
                              <svg viewBox="0 0 20 20" height="16" width="16" fill="currentColor">
                                <path d="M10 20a1.122 1.122 0 01-.834-.372l-7.872-8.581A1.251 1.251 0 011.118 9.7 1.114 1.114 0 012.123 9H6V2.123A1.125 1.125 0 017.123 1h5.754A1.125 1.125 0 0114 2.123V9h3.874a1.114 1.114 0 011.007.7 1.25 1.25 0 01-.171 1.345l-7.876 8.589A1.128 1.128 0 0110 20zm-7.684-9.75L10 18.69l7.74-8.44h-4.99v-8h-5.5v8H2.316zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013z"></path>
                              </svg>
                            </button>)
                        }
                        {/* <button onClick={()=>voteHandler('DOWN')}><svg viewBox="0 0 20 20" height="16" width="16" icon-name="downvote-outline" fill="currentColor">
                          <path d="M10 20a1.122 1.122 0 01-.834-.372l-7.872-8.581A1.251 1.251 0 011.118 9.7 1.114 1.114 0 012.123 9H6V2.123A1.125 1.125 0 017.123 1h5.754A1.125 1.125 0 0114 2.123V9h3.874a1.114 1.114 0 011.007.7 1.25 1.25 0 01-.171 1.345l-7.876 8.589A1.128 1.128 0 0110 20zm-7.684-9.75L10 18.69l7.74-8.44h-4.99v-8h-5.5v8H2.316zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013z"></path>
                        </svg>
                        </button> */}
                        {/* M18.88 9.7a1.114 1.114 0 00-1.006-.7H14V2.123A1.125 1.125 0 0012.877 1H7.123A1.125 1.125 0 006 2.123V9H2.123a1.114 1.114 0 00-1.005.7 1.25 1.25 0 00.176 1.348l7.872 8.581a1.124 1.124 0 001.667.003l7.876-8.589A1.248 1.248 0 0018.88 9.7z */}
                      </div>
                    </div>
                    {userState.userInfo && data.post.userId._id === userState.userInfo._id && (
                    <div className='flex flex-row gap-x-5'>
                      <button onClick={()=> {return navigate(`/editPost/${data.post.slug}`)}}>Edit</button>
                      <button onClick={deleteHandler}>Delete</button>
                    </div>
                    )}
                    
                </div>
            </div>

            <div className='mt-10'>
                <AddComment label="Comment" formHandler={(text) =>addCommentHandler(text)} loading={false} />
            </div>

            <div className='mt-10'>
                <div className='Font-semi text-xl mb-5'>Comments ({data.commentCount}):</div>
                <AllComments reload={reload} uuid={data.post.slug}/>
            </div>
            
        </div>
        )}
    </MainLayout>
  )
}

export default PostPage