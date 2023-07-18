import React, { useState } from 'react'

const AddComment = ({label, formHandler, initialText="",loading=false, cancelHandler=null}) => {
  
    const [text, setText] = useState(initialText)

    // const cancelHandler
    const submitHandler = (e) =>{
        e.preventDefault();
        formHandler(text);
        if(label==="Comment"){
          setText("");
        }
    }
    // console.log(initialText)
    return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="5"
          placeholder="Leave your comment here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {label!=="Comment" && (
            <div
              onClick={cancelHandler}
              className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500 hover:cursor-pointer"
            >
              Cancel
            </div>
          )}
          <button
            disabled={loading || text.length<1}
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-500
         text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {label}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddComment
