import Conversation from "../models/Conversation.js";

const newConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const members = [senderId, receiverId];
    const existConverstion = await Conversation.findOne({
      members: {
        $all: members,
      },
    });
    if (existConverstion) {
      return res.status(200).json(existConverstion);
    }
    const createNew = await Conversation.create({
      members: members,
    });
    return res.status(200).json(createNew);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getConversations = async (req, res) => {
  try {
    const { _id } = req.query;
    const conversations = await Conversation.find({
      members: { $in: _id },
    })
      .populate("members", "avatar name")
      .sort({
        updatedAt: -1,
      });
    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { newConversation, getConversations };
