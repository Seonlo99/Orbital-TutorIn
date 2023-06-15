import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
    {
        studentId: { type: Schema.Types.ObjectId, ref: 'User' },
        tutorId: { type: Schema.Types.ObjectId, ref: 'User' },
        studentAccepted: {type:Boolean, default:null},
        tutorAccepted: {type:Boolean, default:null},
        studentReviewId: { type: Schema.Types.ObjectId, ref: 'Review', default:null },
        tutorReviewId: { type: Schema.Types.ObjectId, ref: 'Review', default:null },
    },
    { timestamps: true }
);


const Transaction = model("Transaction", TransactionSchema);
export default Transaction;