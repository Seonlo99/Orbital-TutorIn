import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const newMessages = async (req, res) => {
  try {
    const { conversationId, senderId, message } = req.body.params;
    const updateConversation = await Conversation.updateOne(
      {
        _id: conversationId,
      },
      { $currentDate: { lastUpdated: true } }
    );
    const messages = await Message.create({
      conversationId: conversationId,
      senderId: senderId,
      message: message,
    });
    return res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.query;
    const messages = await Message.find({
      conversationId: conversationId,
    }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { newMessages, getMessages };
