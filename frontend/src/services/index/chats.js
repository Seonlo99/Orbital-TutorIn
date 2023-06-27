import axios from "axios";
import { rootUrl } from "../../config/config";

export const newConversations = async ({ senderId, receiverId }) => {
  try {
    const { data } = await axios.post(`${rootUrl}/api/conversations`, {
      senderId: senderId,
      receiverId: receiverId,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getConversations = async (_id) => {
  try {
    const { data } = await axios.get(`${rootUrl}/api/conversations`, {
      params: { _id: _id },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getChat = async (conversationId) => {
  try {
    const { data } = await axios.get(`${rootUrl}/api/messages`, {
      params: { conversationId: conversationId },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const sendMessage = async (conversationId, senderId, message) => {
  try {
    console.log(conversationId, senderId, message);
    const { data } = await axios.post(`${rootUrl}/api/messages`, {
      params: {
        conversationId: conversationId,
        senderId: senderId,
        message: message,
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
