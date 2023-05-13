import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

import { logout } from '../store/actions/user';

const Header = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        dispatch(logout());
    }
    
    const profileHandler = ()=>{
        console.log("view profile");
    }

  return (
    <section>
        <header className='container mx-auto w-full max-w-screen-2xl px-5 flex justify-between py-4 items-center'>
            <div>
                <span className='text-blue-800'>TutorIn</span>
            </div>
            <div className='flex gap-x-9 items-center'>
                <ul className='flex gap-x-5'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/discuss">Discussion</Link>
                    </li>
                    <li>
                        <Link to="/">Services</Link>
                    </li>
                </ul>
                {userState.userInfo? 
                (
                <div className='flex flex-row items-center'>
                    <CgProfile size={40} onClick={profileHandler} className='hover:cursor-pointer mr-3'/>
                    <button onClick={logoutHandler} className='border-2 border-blue-500 px-4 py-1 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'>Logout</button>
                </div>
                
                ):
                (<button onClick={()=> navigate('/login')} className='border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'>Sign In</button>)}
                
            </div>
        </header>
    </section>
  )
}

export default Header