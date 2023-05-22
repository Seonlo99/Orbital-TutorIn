import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

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

        // console.log(posts)
        return res.json({comments})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}



export { addComment, getComments };