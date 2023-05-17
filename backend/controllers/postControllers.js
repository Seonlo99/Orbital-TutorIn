import Post from "../models/Post"
import {v4 as uuid} from 'uuid'

export const getAllPosts = async (req, res) => {
    try{
        const {page=1} = req.query
        // console.log(req)
        const POSTLIMIT =10
        let posts = await Post.find({}, null, {skip: (parseInt(page)-1) * POSTLIMIT, limit:POSTLIMIT}).sort({ _id: -1 }).populate({
            path:"userId",
            select: ['username','tutor']
        });

        const totalCount = await Post.estimatedDocumentCount();
        // console.log(posts)
        return res.json({posts, totalCount})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

export const getSinglePost = async (req, res) => {
    try{
        const {slug} = req.query

        // let post = await Post.find({slug}).populate({
        //     path:"comments",
        //     select: ['userId','body']
        // });

        let post = await Post.findOne({slug}).populate([
            {
                path:"userId",
                select: ['username','tutor']
            },
            {
                path:"comments",
                select: ['userId','body']
            }
    ]);
        // console.log(post.comments)
        if(post){
            // console.log(post)
            return res.json({post})
        }
        else{
            return res.status(404).json({message:"Unable to find post!"})
        }
        

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

export const addPost = async (req, res) => {
    try{
        const { title, content } = req.body;
        const post = await Post.create({
            title: title,
            contents: content,
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



export { getAllPosts, getSinglePost, addPost };