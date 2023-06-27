import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import MainLayout from "../components/MainLayout";
import ChatMenu from "../components/Chat/ChatMenu";
import ChatBox from "../components/Chat/ChatBox";
import { getConversations } from "../services/index/chats";

const ChatPage = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!userState.userInfo) {
    //navigate user to home page if not loggin in
    navigate("/");
  }

  const { _id } = userState.userInfo;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userInfo", _id],
    queryFn: () => getConversations(_id),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });

  const [currentChat, setCurrentChat] = useState(null);

  return (
    !isLoading &&
    !isError && (
      <MainLayout>
        <div className="flex h-[calc(100vh-220.89px)]">
          <ChatMenu
            conversations={data}
            setCurrentChat={setCurrentChat}
          />
          {currentChat ? (
            <ChatBox currentChat={currentChat} />
          ) : (
            <span>Click onconversation to view</span>
          )}
        </div>
      </MainLayout>
    )
  );
};

export default ChatPage;
