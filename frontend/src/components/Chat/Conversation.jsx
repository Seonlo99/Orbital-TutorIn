import React from "react";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import stables from "../../constants/stables";
import defaultPic from "../../assets/images/default.png";
import { deleteConversations } from "../../services/index/chats";

const Conversation = ({
  conversations,
  setConversations,
  convo,
  setCurrentChat,
}) => {
  const userState = useSelector((state) => state.user);
  const recipient =
    convo.members[0]?._id === userState.userInfo._id
      ? convo.members[1]
      : convo.members[0];
  const profilePic =
    recipient?.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + recipient?.avatar;

  const { mutate: mutateChat } = useMutation({
    mutationFn: () => {
      return deleteConversations({
        senderId: userState.userInfo._id,
        receiverId: recipient._id,
      });
    },
    onSuccess: (data) => {
      setConversations(conversations.filter((c) => c !== convo));
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });
  const handleDelete = () => {
    mutateChat();
  };

  return (
    <div
      onClick={() => setCurrentChat(convo)}
      className="relative flex justify-between items-center px-5 py-5 hover:bg-gray-200 hover:cursor-pointer"
    >
      <div className="flex items-center">
        <img
          src={profilePic}
          onError={(e) => {
            e.currentTarget.src = defaultPic;
          }}
          alt="profile picture"
          className="w-10 h-10 rounded-full object-cover border mr-3"
        />
        <span>{recipient?.name}</span>
      </div>
      <TiDelete
        onClick={handleDelete}
        className="absolute right-5 bottom-5 text-4xl text-gray-500 hover:text-red-600 hover:cursor-pointer"
      />
    </div>
  );
};

export default Conversation;
