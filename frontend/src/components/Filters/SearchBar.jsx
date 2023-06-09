import React from 'react'

export const SearchBar = ({setSearch}) => {

  return (
    <input onChange={(e)=>setSearch(e.target.value)} className='w-20 lg:w-full rounded-md px-3 py-1 focus:outline-none' placeholder='Search...'></input>
  )
}
