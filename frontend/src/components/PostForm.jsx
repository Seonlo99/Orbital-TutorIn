import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

import Tiptap from '../components/TipTap'
import { TagSelector } from './TagSelector'

const PostForm = ({handleMutate, btnName, initialContent={}, defaultTags=[]}) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(initialContent.title || "")
    
    const [content, setContent] = useState(initialContent.contents || "")
    const [selectedTags, setSelectedTags] = useState(defaultTags)

    const selectTagHandler = (selectedTags)=>{
      setSelectedTags(selectedTags)
    }
    // console.log(content)
    // const titleRef = useRef(initialContent.title);
    // const [title, setTitle] = useState("")
    // console.log(title)
    const handleClick = ()=>{
      if(title.length <=0){
        toast.error("Enter title!")
        return
      }

      if(!content.content || !content.content[0].content){
          toast.error("Enter description!")
          return
      }
        // console.log({title:titleRef.current.value, content})
        handleMutate({title, content, selectedTags})
    }
    // console.log(content)
    // console.log(btnName)
  return (
    <div className='container mx-auto max-w-2xl mt-10 '>

        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">{btnName === 'Post'? "New": "Edit"} Post</div>

        <div className="editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text"></input>
            
            <Tiptap setContent={setContent} initialContent={initialContent.contents}/>

            <div className="icons flex text-gray-500 m-2"></div>

            <TagSelector defaultTags={defaultTags} selectTagHandler={(selectedTags)=>selectTagHandler(selectedTags)} />

            <div className="buttons flex mt-5">
                <button onClick={()=>navigate(-1)} className="border border-gray-300 p-1 px-4 font-semibold text-black ml-auto">Cancel</button>
                <button onClick={handleClick} className="border border-indigo-500 p-1 px-4 font-semibold text-white ml-2 bg-indigo-500">{btnName}</button>
            </div>
        </div>
        
        <section>
            
        </section>
    </div>
  )
}

export default PostForm