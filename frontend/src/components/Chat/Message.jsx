import React from "react";
import { format } from "timeago.js";

import defaultPic from "../../assets/images/default.png";

const Message = ({ message, isSelf }) => {
  return (
    <div className={`mb-3 flex flex-col ${isSelf ? "items-end" : ""}`}>
      <div className="flex flex-row items-center">
        <img
          src={defaultPic}
          alt="profile pic"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div
          className={`px-2 py-1 max-w-md rounded-lg text-sm ${
            isSelf ? "bg-green-500 text-white" : "bg-gray-100 text-black"
          }`}
        >
          {message.message}
        </div>
      </div>
      <div className="text-sm">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
