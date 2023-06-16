import React from 'react'
import { useState } from 'react'
import {useSelector} from "react-redux"
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { addReview } from '../../services/index/reviews';

export const AddReview = ({transactionId, reviewerId, revieweeId}) => {

    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [review, setReview] = useState("")

    const userState = useSelector((state) => state.user);

    const clickHandler = (index)=>{
        if(index===rating){ //double click set to 0
            setRating(0)
            setHoverRating(0)
        }
        else{
            setRating(index)
        }
        
    }

    const { mutate, isLoading} =
    useMutation({
      mutationFn: () => {
        return addReview({ token: userState.userInfo.token ,transactionId, reviewerId, revieweeId, rating, review});
      },
      onSuccess: () => {
        toast.success(
          "Review Added!"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        // console.log(error);
      },
    });

    const handleSubmit= ()=>{
        if(review.length<1){
            toast.error("Write provide some review.")
        }
        else{
            mutate();
        }
    }

  return (
    <div className='container mx-auto max-w-lg mt-10 rounded-lg shadow-md border outline-gray-300'>
        <div className='px-1 py-5 flex flex-col gap-y-2'>
            <div className='flex flex-col items-center gap-y-2'>
                <div className='text-lg font-semibold'>
                    Give Choon Siang a review?
                </div>
                <div className='flex flex-row items-center gap-x-1'>
                    <div>
                        {[...Array(5)].map((star,index)=>{
                            index+=1;
                            return (
                                <button key={index} className={index <= ((rating && hoverRating) || hoverRating) ? "text-yellow-300" : "text-gray-300"}
                                    onClick={()=>clickHandler(index)}
                                    onMouseEnter={()=>setHoverRating(index)}
                                    onMouseLeave={()=> setHoverRating(rating)}>
                                    <span className={`text-2xl`}>&#9733;</span>
                                </button>
                            )
                        })}
                    </div>
                    <div>
                    ({hoverRating} / 5)
                    </div>
                    
                </div>
                <div className='mx-5 '>
                    <textarea onChange={(e)=>setReview(e.target.value)}
                    className='border outline-gray-300 px-2 min-w-[15rem] py-2' rows="4" placeholder='Write review...'></textarea>
                </div>
            </div>
            <div className='mr-5'>
                    <button onClick={handleSubmit} className='float-right rounded-lg bg-blue-500 text-white font-semibold px-2 py-2'>
                        Add Review
                    </button>
            </div>
            
        </div>
        
    </div>
  )
}
