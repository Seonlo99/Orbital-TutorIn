import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import {FaBold, FaHeading, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaStrikethrough, FaUnderline, FaUndo} from  "react-icons/fa"
import Placeholder from '@tiptap/extension-placeholder'

import './../styles/tiptap.css'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-row justify-between'>
        
    <div className='flex flex-row mx-2 my-2 gap-x-3'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('bold') ? 'bg-gray-400' : ''}`}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('italic') ? 'bg-gray-400' : ''}`}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('underline') ? 'bg-gray-400' : ''}`}
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('strike') ? 'bg-gray-400' : ''}`}
      >
        <FaStrikethrough />
      </button>

      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-400' : ''}`}
      >
        <FaHeading />
      </button> */}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('bulletList') ? 'bg-gray-400' : ''}`}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('orderedList') ? 'bg-gray-400' : ''}`}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`text-xl px-1 py-1 rounded-md ${editor.isActive('blockquote') ? 'bg-gray-400' : ''}`}
      >
        <FaQuoteLeft />
      </button>
      </div>

      <div className='flex flex-row mx-2 my-2 gap-x-3'>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={`text-xl px-1 py-1 rounded-md `}
      >
        <FaUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={`text-xl px-1 py-1 rounded-md `}
      >
        <FaRedo />
      </button>
    </div>
    </div>
  )
}

const Tiptap = ({setContent}) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write your description here…',
      }),
    ],
    content: ``,
    onUpdate: ({ editor }) => {
        setContent(editor.getJSON());
        // send the content to an API here
    },
  })

  return (
    <div className='border border-gray-400 rounded-md'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className='border-t border-gray-400 bg-gray-100'/>
    </div>
  )
}

export default Tiptap