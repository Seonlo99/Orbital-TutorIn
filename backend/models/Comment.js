import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref:'User', required: true, index: true },
        body: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref:'Post', required: true, index: true, },
        // upvotes: [{ type: Schema.Types.ObjectId, ref: 'Upvote' }],
        // upvoteCount: { type: Number, default: 0 },
        commentSlug: {type:String, required:true, unique:true},
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
            index: true
        },
        replyUser:{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        isDeleted: {type:Boolean, default:false}
        
    },
    { timestamps: true }
);

CommentSchema.virtual("replies",{
    ref: "Comment",
    localField: "_id",
    foreignField: "parent"
});


const Comment = model("Comment", CommentSchema);
export default Comment;