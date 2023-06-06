import { Schema, model } from "mongoose";

const UpvoteSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true}, //id of the user upvoting
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true}, //id of the post/comment author
        postId: { type: Schema.Types.ObjectId, ref:'Post', required: true},
        commentId: { type: Schema.Types.ObjectId, ref:'Comment', default: null},
        value: { type: Number, default: 0 },
    },
    { timestamps: true }
)

const Upvote = model("Upvote", UpvoteSchema);
export default Upvote;