import React from "react";
import { useSelector } from "react-redux";

import stables from "../../constants/stables";
import defaultPic from "../../assets/images/default.png";

const Conversation = ({ convo, setCurrentChat }) => {
  const userState = useSelector((state) => state.user);
  const recipient =
    convo.members[0]?._id === userState.userInfo._id
      ? convo.members[1]
      : convo.members[0];
  const profilePic =
    recipient.avatar === ""
      ? defaultPic
      : stables.UPLOAD_FOLDER_BASE_URL + recipient.avatar;
  return (
    <div
      onClick={() => setCurrentChat(convo)}
      className="flex items-center px-5 py-5 hover:bg-gray-200 mt-2 hover:cursor-pointer"
    >
      <img
        src={profilePic}
        onError={(e) => {
          e.currentTarget.src = defaultPic;
        }}
        alt="profile picture"
        className="w-10 h-10 rounded-full object-cover border mr-7"
      />
      <span>{recipient.name}</span>
    </div>
  );
};

export default Conversation;
