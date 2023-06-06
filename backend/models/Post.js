import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        contents: { type: Object, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'Upvote' }],
        upvoteCount: { type: Number, default: 0 },
        slug: {type:String, required:true, unique:true},
        tags: {type: [String], index: true},
        isDeleted: {type:Boolean, default:false}
    },
    { timestamps: true }
);

PostSchema.virtual("comments",{
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
});


const Post = model("Post", PostSchema);
export default Post;