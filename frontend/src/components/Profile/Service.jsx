import React from 'react'
import { useState } from 'react';
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'
import { getTransaction, newTransaction, deleteTransaction } from '../../services/index/transactions';
import toast from "react-hot-toast"

export const Service = ({viewedUser, userId, token}) => {

  const [transaction,setTransaction] = useState({})

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => getTransaction({ tutorId: viewedUser._id, studentId:userId }),
    onSuccess: (data)=>{
      if(data && data.transaction){
        setTransaction(data.transaction)
      }
        
    },
    onError: (error) => {
      toast.error(error.message);

    },
  });
  // console.log(data)
  const queryClient = useQueryClient()

  const {mutate, isLoading: isMutateLoading} = useMutation({
    mutationFn: ()=>{
      return newTransaction({ token, tutorId: viewedUser._id, studentId:userId });
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey:["transaction"]})
    },
    onError: (error) =>{
      toast.error(error.message)
      // console.log(error);
    }
  });

  // console.log(transaction)

  const engageHandler = ()=>{
    mutate()
  }


  const {mutate:mutateCancel, isLoading: isCancelLoading} = useMutation({
    mutationFn: ()=>{
      return deleteTransaction({ token, transactionId:transaction._id, tutorId: viewedUser._id, studentId:userId });
    },
    onSuccess: (data) => {
        toast.success("Tutoring service cancelled")
        queryClient.invalidateQueries({queryKey:["transaction"]})
    },
    onError: (error) =>{
      toast.error(error.message)
      // console.log(error);
    }
  });

  const cancelHandler = ()=>{
    mutateCancel()
  }

  // console.log(data)


  return (
    !isLoading && !isError && (
      <div className='flex flex-row gap-x-8 justify-end'>
        {viewedUser.tutor && data === null && //only display for tutor, and when there is no pending transaction
          <button onClick={engageHandler} disabled={isMutateLoading} className="border border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white">
            Engage Tutor
          </button>
        }
        {viewedUser.tutor && data?.transaction?.tutorAccepted === null && ( //only display for tutor, and when there is no pending transaction
          <div className="flex flex-row items-center gap-x-2">
            <div className='italic font-light'>
              Pending Acceptance from tutor
            </div>
            <button onClick={cancelHandler} disabled={isCancelLoading} className="border border-red-600 rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white">
              Cancel?
            </button>
          </div>
          )
        }
        <button className="border border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white">
          Chat Now
        </button>
      </div>
    )
  )
}
