import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
    {   
        transactionId: {type: Schema.Types.ObjectId, ref: 'Transaction'},
        reviewerId: { type: Schema.Types.ObjectId, ref: 'User' },
        revieweeId: { type: Schema.Types.ObjectId, ref: 'User' },
        stars: {type:Number, required:true,}, // review stars
        reviewComment: {type:String, required:true}, //review comment
    },
    { timestamps: true }
);


const Review = model("Review", ReviewSchema);
export default Review;