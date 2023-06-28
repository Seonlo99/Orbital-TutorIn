import React from "react";
import Conversation from "./Conversation";
import { useState, useEffect } from "react";

const ChatMenu = ({ conversations, setConversations, setCurrentChat }) => {
  const [search, setSearch] = useState("");
  console.log(conversations);
  return (
    conversations && (
      <div className="w-auto min-w-3.5 px-5 py-5 border-r-2">
        <input
          type="text"
          placeholder="Search user"
          className="w-full border rounded-lg px-2 py-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-2 h-full overflow-y-scroll">
          {conversations.map((convo) => (
            <Conversation
              conversations={conversations}
              setConversations={setConversations}
              convo={convo}
              setCurrentChat={setCurrentChat}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default ChatMenu;
