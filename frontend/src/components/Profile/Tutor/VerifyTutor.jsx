import React from 'react'
import { useState } from 'react'
import {useSelector} from "react-redux"
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';

import {addApplication} from "../../../services/index/applications"

export const VerifyTutor = ({closeHandler}) => {

    const userState = useSelector((state) => state.user);

    const [userFile, setUserFile] = useState(null);

    const onChangeFile = e => {
        setUserFile(e.target.files[0]);
        
    };

    const { mutate, isLoading} =
    useMutation({
      mutationFn: ({formData}) => {
        // console.log(formData)
        return addApplication({ token: userState.userInfo.token, formData});
      },
      onSuccess: () => {
        toast.success(
          "Submitted for verification!"
        );
        // closeHandler();
      },
      onError: (error) => {
        toast.error(error.message);
        // console.log(error);
      },
    });

    const handleSubmit= ()=>{
      const file = new File([userFile], `${userFile?.name}`, {
        type: userFile?.type,
      });
    //   console.log(file)
      const formData = new FormData();
      formData.append("file", file);
      mutate({formData:formData});
    }

  return (
    <div className='flex justify-center items-center fixed top-0 left-0 right-0 backdrop-blur-sm z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
        <div className='bg-white container mx-auto max-w-lg rounded-lg shadow-md border outline-gray-300'>
            <div className='flex flex-row justify-end px-2 py-1'>
                <button onClick={closeHandler} className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            
            <div className='px-1 pb-5 flex flex-col gap-y-2'>
                    <div className='flex flex-col items-center gap-y-2'>
                        <div className='text-lg font-semibold'>
                            Please upload your academic transcript! 
                        </div>
                        <div className='font-light'>
                            PDF file only, less than 5mb
                        </div>
                        <div className='flex flex-row items-center gap-x-1'>
                        
                            <input type="file" onChange={onChangeFile}/>
                            
                        </div>
                    </div>
                    <div className='mr-5 flex flex-row gap-x-2 justify-end'>
                        <button onClick={closeHandler} className='rounded-lg border border-red-500 text-black font-semibold px-2 py-2'>
                            Cancel
                        </button>
                        <button disabled={isLoading} onClick={handleSubmit} className='rounded-lg bg-blue-500 text-white font-semibold px-2 py-2'>
                            Submit
                        </button>    
                    </div>
            </div>
            
        </div>
    </div>
  )
}