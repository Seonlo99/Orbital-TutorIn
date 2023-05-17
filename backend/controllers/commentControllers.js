import Comment from "../models/Comment"
import Post from "../models/Post"

export const addComment = async (req, res) => {
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
        });

        return res.json({comment})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}



export { addComment };