import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import {useMutation} from "@tanstack/react-query"
import toast from 'react-hot-toast'
import {useDispatch, useSelector} from "react-redux"

import MainLayout from '../components/MainLayout'
import { userLogin } from '../services/index/users'
import { userActions } from '../store/reducers/userReducers'

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  const {mutate, isLoading} = useMutation({
    mutationFn: ({username,password})=>{
      return userLogin({username, password});
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      // console.log(data);
    },
    onError: (error) =>{
      toast.error(error.message)
      // console.log(error);
    }
  });

  useEffect(()=>{
    if(userState.userInfo){ //navigate user to home page if logged in
      navigate("/");
    }
  }, [navigate, userState.userInfo])

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    watch,
  } = useForm({
      defaultValues:{
        username:"",
        password:"",
      }, 
      mode:"onChange"
    
  });
  const submitHandler = (data)=>{
    const {username,password} = data;
    mutate({username,password});
  };

  // console.log(errors)
  return (
    <MainLayout>
        <section className='container mx-auto px-5 py-10'>
          <div className='w-full max-w-sm mx-auto'>
            <h1 className='font-bold text-2xl text-center text-black'>
              Login
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className='flex flex-col w-full'>
                <label htmlFor="username" className='text-gray-500 font-semibold block mt-5'>
                  Username:
                </label>
                <input type="text" id="username" 
                  {...register("username",
                   {
                    minLength:
                    {
                      value:4,
                      message: "Username must be at least 4 characters"
                    },
                    required:
                    {
                      value:true,
                      message:"Username is required"
                    }
                  })} placeholder='Enter Username' className={`placeholder:text-gray-400 text-black mt-1 rounded-lg font-semibold block px-3 py-2 outline-none border  ${errors.username ? "border-red-500": "border-gray-300"}`} />
                {errors.username?.message && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.username?.message}
                  </p>
                )}

                <label htmlFor="password" className='text-gray-500 font-semibold block mt-5'>
                  Password:
                </label>
                <input type="password" id="password" {...register("password",
                   {
                    minLength:
                    {
                      value:6,
                      message: "Password must be at least 6 characters"
                    },
                    required:
                    {
                      value:true,
                      message:"Password is required"
                    }
                  })} placeholder='Enter Password' className={`placeholder:text-gray-400 text-black mt-1 rounded-lg font-semibold block px-3 py-2 outline-none border  ${errors.username ? "border-red-500": "border-gray-300"}`}/>
                {errors.password?.message && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.password?.message}
                  </p>
                )}
                <Link to="" className='mt-5 text-xs text-blue-500'>Forget Password?</Link>
                <button type="submit" disabled={!isValid || isLoading} className='bg-blue-500 text-white font-bold text-lg w-full rounded-lg py-2 mt-5 disabled:opacity-70 disabled:cursor-not-allowed'>
                    Submit
                </button>
                <span className='mt-5 text-xs text-right'>No account yet? <Link to="" className='text-blue-500'>Register Now</Link></span>
              </div>
            </form>
          </div>
        </section>
    </MainLayout>
    
  )
}

export default LoginPage