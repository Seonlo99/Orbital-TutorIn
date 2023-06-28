import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);
export default Message;
