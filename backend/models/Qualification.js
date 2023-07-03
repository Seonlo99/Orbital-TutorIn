import { Schema, model } from "mongoose";

const QualificationSchema = new Schema(
  {
    tutorId: { type: Schema.Types.ObjectId, ref: "User" },
    modules: [{ type: String, require: true }],
  },
  { timestamps: true }
);

const Qualification = model("Qualification", QualificationSchema);
export default Qualification;
