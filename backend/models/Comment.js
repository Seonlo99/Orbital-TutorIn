import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref:'User', required: true },
        body: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref:'Post', required: true },
        upvoteCount: { type: Number, default: 0 },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null
        },
        replyUser:{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        
    },
    { timestamps: true }
);

PostSchema.virtual("replies",{
    ref: "Comment",
    localField: "_id",
    foreignField: "parent"
});


const Comment = model("Comment", CommentSchema);
export default Comment;