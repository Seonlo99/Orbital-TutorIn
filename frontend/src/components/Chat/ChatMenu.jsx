import React from "react";
import Conversation from "./Conversation";

const ChatMenu = ({ conversations, setCurrentChat }) => {
  return (
    <div className="w-auto min-w-3.5 px-5 py-5 border-r-2">
      <input
        type="text"
        placeholder="Search user"
        className="w-full border rounded-lg px-2 py-2"
        // onChange={}
      />
      <div className="mt-2 h-full overflow-y-auto">
        {conversations?.map((convo) => (
          <Conversation key={convo._id}
            convo={convo}
            setCurrentChat={setCurrentChat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMenu;
