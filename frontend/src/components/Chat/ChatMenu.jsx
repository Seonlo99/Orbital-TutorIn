import React from "react";
import Conversation from "./Conversation";

const ChatMenu = ({ conversations, setCurrentChat }) => {
  return (
    conversations && (
      <div className="w-auto min-w-3.5 px-5 py-5 border-r-2">
        <input
          type="text"
          placeholder="Search user"
          className="w-full border rounded-lg px-2 py-2"
          // onChange={}
        />
        {conversations.map((convo) => (
          <Conversation
            convo={convo}
            setCurrentChat={setCurrentChat}
          />
        ))}
      </div>
    )
  );
};

export default ChatMenu;
