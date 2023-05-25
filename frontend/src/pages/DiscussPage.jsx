import React, { useEffect, useState } from 'react'
import { BiUpvote } from 'react-icons/bi'
import {AiOutlineComment} from 'react-icons/ai'
import {useQuery} from "@tanstack/react-query"
import moment from 'moment'
import {useSelector} from "react-redux"
import {useNavigate, Link} from 'react-router-dom'
import toast from 'react-hot-toast'

import { getAllPosts } from '../services/index/posts'
import MainLayout from '../components/MainLayout'

const DiscussPage = () => {
    const POSTLIMIT = 10;
    let [curPage, setCurPage] = useState(0);
    let [num, setNum] = useState(0);

    const pages = [
        {page:num},
        {page:num+1},
        {page:num+2},
    ]

    function nextPage(totalPosts){
        setNum((curState)=>{
            return curState+3>= totalPosts/POSTLIMIT ? curState: curState +1
        });
    }
    function prevPage(){
        setNum((curState)=>{
            return curState>0? curState-1:0;
        });
    }

    function mobilePrevPage(){
        setCurPage((curState)=>{
            return curState>0? curState-1:0;
        });
        setNum((curState)=>{
            return curPage;
        });
    }
    function mobileNextPage(totalPosts){
        setCurPage((curState)=>{
            return curState+1 < Math.ceil(totalPosts/POSTLIMIT) ? curState+1: curState;
        });
        setNum((curState)=>{
            return curState;
        });
    }

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getAllPosts(curPage+1),
        queryKey: ["posts",curPage],
        onError: (error) =>{
            console.log(error);
        }
    })
    // console.log(data)
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    const newPostHandler = ()=>{
        if(!userState.userInfo){
            toast.error("Login to create new post!")
        }
        else{
            navigate("/createPost")
        }
    }

  return (
  <MainLayout>
    <div className='container mx-auto max-w-4xl mt-5'>
        <section className='flex flex-row rounded-md bg-slate-300 py-4 items-center gap-x-3 px-5 justify-between shadow-md'>
            <div className='flex flex-row items-center gap-x-4'>
                <button onClick={newPostHandler}>
                    New
                </button>
                <div>
                    Filter 1
                </div>
                <div>
                    Filter 2
                </div>
                <div>
                    Filter 3
                </div>
            </div>
            <div>SEARCH BAR</div>
        </section>
        <section className='divide-y divide-slate-300'>
            
            {!isLoading && !isError && data.posts.map((post)=>(
                <div key={post._id} className='flex flex-row px-5 py-5 justify-between'>
                    <div className='flex flex-row'>
                        <div className='text-4xl'>
                        IMG
                        </div>
                        <div className='ml-6'>
                            <div className='font-semibold'>
                                <Link to={`/post/${post.slug}`}>{post.title.substring(0, 50)} {post.title.length > 50 && '...'}</Link>
                                {post.tags && post.tags.slice(0,2).map((tag)=>(
                                <div key={tag} className='ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-gray-300 text-gray-700 border'>
                                    {tag}
                                </div>)
                                )} {post.tags.length>2 && '...'}
                                
                                
                            </div>
                            <div className='font-light text-sm'>
                                Created by: {post.userId.username}, {moment(post.createdAt).format('DD/MM/yyyy')} | {moment(post.createdAt).format('HH:mm')}
                            </div>
                        
                        </div>
                    </div>
                    
                    <div className='flex flex-row gap-x-3 items-center'>
                        <div className='flex flex-row'>
                            <BiUpvote size={24}/> {post.upvoteCount}
                        </div>
                        <div className='flex flex-row'>
                            <AiOutlineComment size={24}/> {post.commentCount}
                        </div>
                    </div>
                </div>
            ))}
            
        </section>
        <section>
        {!isLoading && !isError && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button onClick={mobilePrevPage} disabled={curPage===0} 
                        className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50
                         ${curPage===0 && 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'}`}>
                            Previous
                    </button>
                    <button onClick={()=>mobileNextPage(data.totalCount)} disabled={curPage+1===Math.ceil(data.totalCount/POSTLIMIT)}
                        className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        ${curPage+1===Math.ceil(data.totalCount/POSTLIMIT) && 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'}`}>
                            Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium px-1">{curPage*POSTLIMIT + 1}</span>
                        to
                        <span className="font-medium px-1">{(curPage+1)*POSTLIMIT > data.totalCount? data.totalCount:(curPage+1)*POSTLIMIT}</span>
                        of
                        <span className="font-medium px-1">{data.totalCount}</span>
                        results
                    </p>
                    </div>
                    <div>
                    <div className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button onClick={prevPage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                        </button>
                        {
                            pages.map((page,i)=>
                                {  return (page.page < Math.ceil(data.totalCount/POSTLIMIT) &&
                                <button key={i} onClick={()=>setCurPage((curState)=>page.page)} 
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page.page === curPage && 'bg-indigo-500 text-white z-10 hover:bg-indigo-500'}`}>
                                        {page.page+1}
                                </button>)
                            }
                            )
                        }

                        <button onClick={()=>nextPage(data.totalCount)} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )}
        </section>
    </div>

  </MainLayout>)
}

export default DiscussPage