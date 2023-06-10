import React from 'react'
import {MdKeyboardArrowDown} from "react-icons/md"
// import {TiTick} from "react-icons/ti"

export const Sort = ({sortBy="", setSortByHandler}) => {

    const handleSort = (e)=>{
        if(e.target.value ===sortBy){ //user click same sortby twice, so cancel it
            setSortByHandler("")
        }
        else{
            setSortByHandler(e.target.value)
        }
    }

  return (
    <li className='relative group flex flex-row items-center hover:cursor-pointer'>
        <div>Sort</div>
        <MdKeyboardArrowDown />
        <div className='hidden transition-all duration-500 absolute bottom-0 left-0 transform translate-y-full group-hover:block w-max'>
            <ul className='flex flex-col shadow-lg rounded-lg divide-y overflow-hidden bg-white'>
                <button onClick={handleSort} value="New" className={`hover:bg-gray-300 hover:text-black py-1 px-1 ${sortBy==="New" && 'bg-blue-500 text-white'}`}>Newest</button>
                <button onClick={handleSort} value="Upvote" className={`hover:bg-gray-300 hover:text-black py-1 px-1 ${sortBy==="Upvote" && 'bg-blue-500 text-white'}`}>Most Upvotes</button>
                <button onClick={handleSort} value="Comment" className={`hover:bg-gray-300 hover:text-black py-1 px-1 ${sortBy==="Comment" && 'bg-blue-500 text-white'}`}>Most Comments</button>
            </ul>
        </div>
    </li>
    
  )
}
