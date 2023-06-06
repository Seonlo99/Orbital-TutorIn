import Post from "../models/Post.js"
import {v4 as uuid} from 'uuid'

import { getCommentCount } from "./commentControllers.js"
import { getUserVotesbyPost, getVoteCount } from "./upvoteController.js"

const getAllPosts = async (req, res) => {
    try{
        const {page=1} = req.query
        // console.log(req)
        const POSTLIMIT =10
        let posts = await Post.find({isDeleted:false}, null, {skip: (parseInt(page)-1) * POSTLIMIT, limit:POSTLIMIT}).sort({ _id: -1 }).populate({
            path:"userId",
            select: ['username','tutor']
        });
        posts = await Promise.all(posts.map( async (post) => {
            let count = await getCommentCount(post._id)
            const voteCount = await getVoteCount(post._id, null)
            return ({...post._doc, commentCount:count, voteCount:voteCount})
        }))
        // console.log(posts)
        

        const totalCount = await Post.countDocuments({isDeleted:false})
        // console.log(posts)
        return res.json({posts, totalCount})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const getSinglePost = async (req, res) => {
    try{
        const {slug, userId} = req.query

        // let post = await Post.find({slug}).populate({
        //     path:"comments",
        //     select: ['userId','body']
        // });
        // console.log(userId)

        let post = await Post.findOne({slug, isDeleted:false}).populate([
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
            let count = await getCommentCount(post._id)
            let votes = {}
            let formattedVotes ={}
            if(userId){ //user is logged in
                votes = await getUserVotesbyPost(userId, post._id)
                
                votes.forEach(vote => formattedVotes[vote.commentId? vote.commentId: vote.postId] = vote); //format it such that either the postId or commentId is the key for easier searching later on
                
                // console.log(formattedVotes)
            }

            const voteCount = await getVoteCount(post._id, null)
            // console.log(voteCount)
            return res.json({post,commentCount:count, votes:formattedVotes, voteCount:voteCount})
        }
        else{
            return res.status(404).json({message:"Unable to find post!"})
        }
        

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const addPost = async (req, res) => {
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

const editPost = async (req, res) => {
    try{
        const { title, content,slug } = req.body;

        let post = await Post.findOne({slug, isDeleted:false});
        if(!post){
            return res.status(404).json({message:"Unable to find post!"})
        }
        // console.log(post.userId)
        // console.log(req.user._id)
        if(!post.userId.equals(req.user._id)){ //check if the user is owner of the post
            return res.status(404).json({message:"Not the owner!"})
        }
        post = await Post.findOneAndUpdate({slug}, {title,contents:content});

        return res.json({post})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const deletePost = async (req, res) => {
    try{
        const { slug } = req.query;
        // console.log(slug)
        let post = await Post.findOne({slug, isDeleted:false});
        // console.log(post)
        if(!post){
            return res.status(404).json({message:"Unable to find post!"})
        }
        if(!post.userId.equals(req.user._id)){ //check if the user is owner of the post
            return res.status(404).json({message:"Not the owner!"})
        }
        post = await Post.findOneAndUpdate({slug}, {isDeleted:true});

        return res.json({post})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}



export { getAllPosts, getSinglePost, addPost, editPost, deletePost };