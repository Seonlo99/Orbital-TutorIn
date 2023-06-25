import { Schema, model } from "mongoose";

const ApplicationSchema = new Schema(
    {
        tutorId: { type: Schema.Types.ObjectId, ref: 'User' },
        pdfUrl: { type:String, required:true},
        approved: {type:Boolean, default:null}
    },
    { timestamps: true }
);


const Application = model("Application", ApplicationSchema);
export default Application;