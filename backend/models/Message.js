import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);
export default Message;
