import Upvote from "../models/Upvote.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const addUpvote = async (req, res) => {
    try{
        const { postSlug, commentSlug, action } = req.body;
        let authorId=null;
        let commentId=null;
        // console.log(postSlug)
        // console.log(action)
        // console.log(commentSlug)

        const post = await Post.findOne({slug:postSlug});
        if(commentSlug){ //upvote for comment
            const comment = await Comment.findOne({commentSlug:commentSlug});
            authorId=comment.userId;
            commentId=comment._id;
            
        }
        else{ // upvote for post
            authorId=post.userId
        }

        const value = action===1? 1:-1 // 1 for upvote, -1 for downvote

        const upvote = await Upvote.create({
            userId: req.user._id,
            authorId: authorId,
            postId: post._id,
            commentId: commentId,
            value: value,
        });

        return res.json({upvote})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const editUpvote = async (req, res) => {
    try{
        const { postSlug, commentSlug, action } = req.body;

        let commentId=null;
        const post = await Post.findOne({slug:postSlug});
        if(post){
            if(commentSlug){ //upvote for comment
                const comment = await Comment.findOne({commentSlug:commentSlug});
                if(!comment){ // check if comment exists
                    return res.status(404).json({message:"No such post/comment!"})
                }
                commentId=comment._id;
            }

            const value = action===1? 1:-1 // 1 for upvote, -1 for downvote
    
            const vote = await Upvote.findOneAndUpdate({userId:req.user._id, postId:post._id, commentId:commentId}, {value:value});
    
            return res.json({})
        }
        else{
            return res.status(404).json({message:"No such post/comment!"})
        }
        

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const deleteUpvote = async (req, res) => {
    try{
        const { postSlug, commentSlug } = req.query;

        let commentId=null;
        const post = await Post.findOne({slug:postSlug});
        if(post){
            if(commentSlug){ //upvote for comment
                const comment = await Comment.findOne({commentSlug:commentSlug});
                if(!comment){ // check if comment exists
                    return res.status(404).json({message:"No such post/comment!"})
                }
                commentId=comment._id;
            }
            // console.log(req.user._id)
            // console.log(post._id)
            // console.log(commentId)
            // console.log( await Upvote.findOne({userId:req.user._id, postId:post._id, commentId:commentId}))
            const vote = await Upvote.deleteOne({userId:req.user._id, postId:post._id, commentId:commentId});
            
            // console.log(voteCount)
            return res.json({})
        }
        else{
            return res.status(404).json({message:"No such post/comment!"})
        }

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}




const getUserVotesbyPost = async(userId, postId) => {
    try{
        const votes = await Upvote.find({userId:userId, postId:postId});

        // console.log(votes)

        return votes

    } catch (error){
        console.log(error.message)
        return null
    }
}

const getVoteCount = async(postId, commentId) => {
    try{
        // console.log(commentId)
        // console.log(postId)
        const votes = await Upvote.aggregate([{$match:{postId:postId, commentId:commentId}}, {$group:{_id:null, voteCount: {$sum: "$value"}}}]);
        // console.log(votes)
        if(votes.length<1){ //empty array
            return 0
        }
        else{
            return votes[0].voteCount
        }

    } catch (error){
        console.log(error.message)
        // return res.status(500).json({message:error.message})
        return 0
    }
}


export { addUpvote, editUpvote, deleteUpvote, getVoteCount, getUserVotesbyPost }