import { Schema, model } from "mongoose";

const ConversationSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Conversation = model("Conversation", ConversationSchema);
export default Conversation;
