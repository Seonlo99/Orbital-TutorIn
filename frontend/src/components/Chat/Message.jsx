import React from "react";
import { format } from "timeago.js";

import defaultPic from "../../assets/images/default.png";

const Message = ({ message, isSelf }) => {
  return (
    <div className={`flex flex-col ${isSelf ? "items-end" : ""}`}>
      <div className="flex">
        <img
          src={defaultPic}
          alt="profile pic"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <p
          className={`px-2 py-2 max-w-md rounded-lg text-sm ${
            isSelf ? "bg-gray-100 text-black" : "bg-blue-500 text-white"
          }`}
        >
          {message.message}
        </p>
      </div>
      <div className="mt-3 text-sm">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
