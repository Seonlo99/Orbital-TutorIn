import React from 'react'
import { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


import MainLayout from '../../components/MainLayout'
import ViewPdf from '../../components/Admin/ViewPdf'
import { getApplications } from '../../services/index/applications';



const AdminPage = () => {
    
    const userState = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [showPdf,setShowPdf] = useState(false)

    useEffect(() => {
        if (!userState.userInfo || !userState.userInfo.isAdmin) {
            navigate("/");
        }
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["application"],
        queryFn: () =>
          getApplications({
            token: userState.userInfo.token,
          }),
        onError: (error) => {
          toast.error(error.message);
        },
    });

  const closeHandler = ()=>{
    setShowPdf(false)
  }

  console.log(data)

  return <MainLayout>
    { userState.userInfo.isAdmin &&
    <div className='flex flex-col items-center mt-10'>
        <div className='text-2xl font-bold'>Admin Dashboard</div>
        <div className="mt-10 divide-y divide-slate-300 w-full max-w-4xl">
            <div className="flex flex-row bg-gray-200 px-5 py-2 gap-x-2 rounded-t-lg w-full">
                <div className="w-[40%]">Name</div>
                <div className="w-[30%]">View</div>
                <div className="w-[30%]">Action</div>
            </div>

            <div className="flex flex-row px-5 py-2 gap-x-2 w-full">
                <div className="w-[40%]">CS</div>
                <div className="w-[30%]">
                    <button onClick={()=>setShowPdf(true)} className="border border-black rounded-lg px-1 lg:px-4 py-2 hover:bg-gray-400 hover:text-white">View Pdf</button>
                </div>
                <div className="w-[30%] flex flex-row gap-x-10">
                    <button className='border border-green-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-green-600 hover:text-white'>
                        Accept
                    </button>
                    <button className='border border-red-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-red-600 hover:text-white'>
                        Reject
                    </button>
                </div>
            </div>
            {showPdf && <ViewPdf closeHandler={closeHandler} PDFLINK={"https://res.cloudinary.com/dtcmoxsyq/image/upload/v1687678521/hwx1kf69h5cycvbclakp.pdf"}/>}


        </div>
    </div>
    }
  </MainLayout>
}

export default AdminPage