import React from 'react'


export const Selector = ({selected, setSelected}) => {
    // const [selected, setSelected] = useState("Pending")
    
    const clickHandler = (e)=>{
        setSelected(e.currentTarget.value)
    }

  return (
    <div className='flex flex-row border rounded-full w-fit'>
        <button onClick={(e)=> clickHandler(e)} value="Pending" className={`${selected==="Pending"?"bg-blue-500 text-white":"bg-gray-100 hover:bg-gray-300"}  px-3 py-2 rounded-l-full `}>Pending</button>
        <button onClick={(e)=> clickHandler(e)} value="Progress" className={`${selected==="Progress"?"bg-blue-500 text-white":"bg-gray-100 hover:bg-gray-300"}  px-3 py-2 `}>In Progress</button>
        <button onClick={(e)=> clickHandler(e)} value="Completed" className={`${selected==="Completed"?"bg-blue-500 text-white":"bg-gray-100 hover:bg-gray-300"}  px-3 py-2 rounded-r-full `}>Completed</button>
    </div>
  )
}
