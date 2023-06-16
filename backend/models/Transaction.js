import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
    {
        studentId: { type: Schema.Types.ObjectId, ref: 'User' },
        tutorId: { type: Schema.Types.ObjectId, ref: 'User' },
        studentAccepted: {type:Boolean, default:null},
        tutorAccepted: {type:Boolean, default:null},
        transactionCompleted: {type:Boolean, default:false},
        transactionCancelled: {type:Boolean, default:false},
    },
    { timestamps: true }
);


const Transaction = model("Transaction", TransactionSchema);
export default Transaction;