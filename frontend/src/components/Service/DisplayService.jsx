import React from 'react'
import {useSelector} from 'react-redux'
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import moment from "moment";

import {getSelectedTransactions, deleteTransaction, modifyTransaction} from '../../services/index/transactions'

export const DisplayService = ({selected}) => {
    const userState = useSelector((state) => state.user);
    const queryClient = useQueryClient();
    const userIsTutor = userState.userInfo.tutor
    const {data, isLoading, isError} = useQuery({
        queryKey: ["option",selected],
        queryFn: ()=> getSelectedTransactions({token:userState.userInfo.token, selected:selected, role:userState.userInfo.tutor}),
        onError: (error) => {
            toast.error(error.message);
            // console.log(error)
          },
    })

    console.log(data)

    const {mutate:mutateCancel, isLoading: isCancelLoading} = useMutation({
        mutationFn: ({transactionId, tutorId, studentId})=>{
          return deleteTransaction({ token:userState.userInfo.token, transactionId, tutorId, studentId});
        },
        onSuccess: (data) => {
            toast.success("Tutoring service cancelled")
            queryClient.invalidateQueries({queryKey:["option"]})
        },
        onError: (error) =>{
          toast.error(error.message)
          // console.log(error);
        }
      });
    
    const cancelHandler = ({transactionId, tutorId, studentId})=>{
        mutateCancel({transactionId, tutorId, studentId})
      }

    const {mutate:mutateModify, isLoading: isModifyLoading} = useMutation({
        mutationFn: ({transactionId, tutorId, studentId, action})=>{
          return modifyTransaction({ token:userState.userInfo.token, transactionId, tutorId, studentId, action});
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({queryKey:["option"]})
        },
        onError: (error) =>{
          toast.error(error.message)
        }
      });
    
    const modifyHandler = ({transactionId, tutorId, studentId, action})=>{
        mutateModify({transactionId, tutorId, studentId, action})
      }


  return (
    !isLoading && !isError &&
    <div className='mt-10 divide-y divide-slate-300 w-full max-w-4xl'>
        <div className='flex flex-row bg-gray-200 px-5 py-2 gap-x-2 rounded-t-lg w-full'>
            <div className='w-[30%]'>
                Name
            </div>
            <div className='w-[10%]'>
                Role
            </div>
            <div className='w-[25%]'>
                Status
            </div>
            <div className='w-[15%]'>
                Time
            </div>
            <div className='w-[20%]'>
                Action
            </div>
        </div>
        {data.transaction.map((transaction)=>{
            return (
                <div key={transaction._id} className='flex flex-row px-5 py-2 gap-x-2 w-full'>
                    <div className='w-[30%] overflow-x-auto'>
                        {userIsTutor? transaction.studentId.name : transaction.tutorId.name}
                    </div>
                    <div className='w-[10%] overflow-x-auto'>
                        {userIsTutor? "Student": "Tutor"}
                    </div>
                    <div className='w-[25%] overflow-x-auto'>
                        {selected==="Pending" && "Pending Acceptance" }
                        {selected==="Progress" && "In Progress" }
                        {selected==="Completed" && (transaction.transactionCompleted? "Completed" :
                         transaction.tutorAccepted? "Cancelled" : "Rejected by Tutor" )
                        }
                    </div>
                    <div className='w-[15%] overflow-x-auto'>
                        {selected==="Pending"? 
                        <>
                            {moment(transaction.createdAt).format("DD/MM/yyyy")},{" "}
                            {moment(transaction.createdAt).format("HH:mm")}
                        </> : 
                        <>
                        {moment(transaction.updatedAt).format("DD/MM/yyyy")},{" "}
                        {moment(transaction.updatedAt).format("HH:mm")}
                        </>
                        }
                        
                    </div>
                    <div className='w-[20%] overflow-x-auto'>
                        {selected==="Pending" && (userIsTutor? 
                            <div className='flex flex-col lg:flex-row gap-x-1 gap-y-1'>
                            <button onClick={()=>modifyHandler({transactionId:transaction._id, studentId:transaction.studentId, tutorId:transaction.tutorId, action:"Accept"})}
                            disabled={isModifyLoading} className=" border border-green-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-green-600 hover:text-white">
                                Accept
                            </button>
                            <button onClick={()=>modifyHandler({transactionId:transaction._id, studentId:transaction.studentId, tutorId:transaction.tutorId, action:"Reject"})}
                            disabled={isModifyLoading} className="border border-red-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-red-600 hover:text-white">
                                Reject
                            </button>
                            </div>
                        :
                            <button onClick={()=>cancelHandler({transactionId:transaction._id, studentId:transaction.studentId, tutorId:transaction.tutorId})}
                            disabled={isCancelLoading} className="border border-red-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-red-600 hover:text-white">
                                Cancel
                            </button>
                        )
                        }

                        {selected==="Progress" && (userIsTutor? "":
                            <button onClick={()=>modifyHandler({transactionId:transaction._id, studentId:transaction.studentId, tutorId:transaction.tutorId, action:"Completed"})}
                            disabled={isModifyLoading} className=" border border-green-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-green-600 hover:text-white">
                                Completed
                            </button>
                        )}

                        {selected==="Completed" && transaction.transactionCompleted && ( transaction.reviewed? "":
                            <button className=" border border-blue-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-blue-600 hover:text-white">
                                Write Review
                            </button>
                        )}
                    </div>
                </div>
            )
        })}
        
    </div>
  )
}