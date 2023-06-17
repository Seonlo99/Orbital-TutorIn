import React from 'react'
import { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


import MainLayout from '../components/MainLayout'
import { Selector } from '../components/Service/Selector'
import { DisplayService } from '../components/Service/DisplayService'



const ServicePage = () => {
    
    const [selected, setSelected] = useState("Pending")
    const userState = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
    if (!userState.userInfo) {
      //navigate user to login if user has not login
      navigate("/");
    }
  }, [userState.userInfo]);

  return <MainLayout>
    { userState.userInfo &&
    <div className='flex flex-col items-center mt-10'>
       <Selector selected={selected} setSelected={(select)=>setSelected(select)} />
       <DisplayService selected={selected}/>
    </div>
    }
  </MainLayout>
}

export default ServicePage