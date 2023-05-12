import React from 'react'
import MainLayout from '../components/MainLayout'
import { BiUpvote } from 'react-icons/bi'
import {AiOutlineComment} from 'react-icons/ai'
import {useQuery} from "@tanstack/react-query"
import { getAllPosts } from '../services/index/posts'
import moment from 'moment'

const DiscussPage = () => {

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error) =>{
            console.log(error);
        }
    })
    // console.log(data)

  return (
  <MainLayout>
    <div className='container mx-auto max-w-4xl mt-5'>
        <section className='flex flex-row rounded-md bg-slate-300 py-4 items-center gap-x-3 px-5 justify-between shadow-md'>
            <div className='flex flex-row items-center gap-x-4'>
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
            
            {!isLoading && !isError && data.map((post)=>(
                <div key={post._id} className='flex flex-row px-5 py-5 justify-between'>
                    <div className='flex flex-row'>
                        <div className='text-4xl'>
                        IMG
                        </div>
                        <div className='ml-6'>
                            <div className='font-semibold'>
                                {post.title.substring(0, 50)} {post.title.length > 50 && '...'}
                                {post.tags && post.tags.slice(0,2).map((tag)=>(
                                <div className='ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-gray-300 text-gray-700 border'>
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
                            <AiOutlineComment size={24}/> 2
                        </div>
                    </div>
                </div>
            ))}
            
        </section>
    </div>

  </MainLayout>)
}

export default DiscussPage