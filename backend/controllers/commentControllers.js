import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import {v4 as uuid} from 'uuid'

import { getVoteCount } from "./upvoteController.js"

const addComment = async (req, res) => {
    try{
        const { desc:body, slug, parent, replyUser } = req.body;
        // console.log(slug)
        const post = await Post.findOne({slug:slug})
        // console.log(post)
        if(!post){
            return res.status(404).json({message:"No such post exist!"})
        }

        const comment = await Comment.create({
            body,
            userId: req.user._id,
            upvoteCount: 0,
            postId: post._id,
            parent,
            replyUser,
            commentSlug: uuid(),
        });

        return res.json({comment})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const getComments = async (req, res) => {
    try{
        const {slug, parentId=null} = req.query
        // console.log(parentId)
        const post = await Post.findOne({slug:slug})
        let comments = await Comment.find({postId:post._id, parent:parentId}).populate(
            [
                {
                    path:"userId",
                    select: ['username','tutor']
                },
                {
                    path:"parent"
                }
            ]
        );
        
        comments = await Promise.all(comments.map( async (comment) => {
            const voteCount = await getVoteCount(post._id, comment._id)
            // console.log({...comment._doc, voteCount:voteCount})
            return ({...comment._doc, voteCount:voteCount})
        }))

        // console.log(comments)

        // console.log(posts)
        return res.json({comments})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}


const editComment = async (req, res) => {
    try{
        const { desc, id } = req.body;

        let comment = await Comment.findOne({_id:id, isDeleted:false});
        if(!comment){
            return res.status(404).json({message:"Unable to find comment!"})
        }
        if(!comment.userId.equals(req.user._id)){ //check if the user is owner of the post
            return res.status(404).json({message:"Not the owner!"})
        }
        comment = await Comment.findOneAndUpdate({_id:id}, {body:desc});

        return res.json({comment})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const deleteComment = async (req, res) => {
    try{
        const { id } = req.query;
        // console.log(slug)
        let comment = await Comment.findOne({_id:id, isDeleted:false});
        // console.log(post)
        if(!comment){
            return res.status(404).json({message:"Unable to find comment!"})
        }
        if(!comment.userId.equals(req.user._id)){ //check if the user is owner of the post
            return res.status(404).json({message:"Not the owner!"})
        }
        comment = await Comment.findOneAndUpdate({_id:id}, {isDeleted:true});

        return res.json({comment})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}




const getCommentCount = async (postId) => {
    try{
        let count = await Comment.countDocuments({postId:postId})

        return count;

    } catch (error){
        return 0;
    }
}



export { addComment, getComments, editComment, deleteComment, getCommentCount };