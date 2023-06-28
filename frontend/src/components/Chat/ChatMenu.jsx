import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import Conversation from "./Conversation";
import { findUsers } from "../../services/index/users";
import defaultPic from "../../assets/images/default.png";
import { newConversations } from "../../services/index/chats";
import stables from "../../constants/stables";

const ChatMenu = ({ conversations, setConversations, setCurrentChat }) => {
  const userState = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [arrivalConvo, setArrivalConvo] = useState(null);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["findUsers", search],
    queryFn: () => findUsers({ search }),
    onSuccess: (data) => {
      setResult(data.users);
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });

  const { mutate: mutateConvo } = useMutation({
    mutationFn: (receiverId) => {
      return newConversations({
        senderId: userState.userInfo._id,
        receiverId: receiverId,
      });
    },
    onSuccess: (data) => {
      setArrivalConvo(data);
      setSearch("");
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });

  useEffect(() => {
    arrivalConvo &&
      !conversations.some((convo) => convo._id === arrivalConvo._id) &&
      setConversations([...conversations, arrivalConvo]);
  }, [arrivalConvo]);

  return (
    <div className="relative w-auto min-w-3.5 p-5 border-r-2">
      <input
        type="text"
        placeholder="Search user"
        className="w-full border rounded-lg px-2 py-2"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div
        className={`${
          search ? "visible" : "invisible"
        } absolute flex flex-col bg-white w-[calc(100%-40px)] z-[10] border-r-2 border-l-2`}
      >
        {!isLoading && !isError && result
          ? result.map((user) => (
              <div
                onClick={() => mutateConvo(user._id)}
                className="flex items-center z-[10] p-5 hover:bg-gray-200 hover:cursor-pointer border-b-2"
              >
                <img
                  src={
                    user?.avatar
                      ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                      : defaultPic
                  }
                  onError={(e) => {
                    e.currentTarget.src = defaultPic;
                  }}
                  alt="profile picture"
                  className="w-10 h-10 rounded-full object-cover border mr-3"
                />
                <span>{user.name}</span>
              </div>
            ))
          : "No results found"}
      </div>
      <div className="mt-2 h-[100%] overflow-y-auto">
        {conversations?.map((convo) => (
          <Conversation
            conversations={conversations}
            setConversations={setConversations}
            convo={convo}
            setCurrentChat={setCurrentChat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMenu;
