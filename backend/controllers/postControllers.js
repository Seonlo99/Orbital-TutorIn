import Post from "../models/Post"
import {v4 as uuid} from 'uuid'

export const getAllPosts = async (req, res) => {
    try{
        let posts = await Post.find().populate({
            path:"userId",
            select: ['username','tutor']
        });

        return res.json(posts)

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

export const addPost = async (req, res) => {
    try{
        const post = await Post.create({
            title: "Please send help for CS2105 CS2106 CS2107. I NEED HELPPPPPPPPPPPPPPP",
            contents: {
                type: "doc",
                content: ["ABCDEFG"],
            },
            userId: req.user._id,
            upvoteCount: 0,
            slug: uuid(),
            tags: ["CS2105","CS2106","CS2107","CS2102"],
        });

        return res.json({post})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}



export { getAllPosts, addPost };