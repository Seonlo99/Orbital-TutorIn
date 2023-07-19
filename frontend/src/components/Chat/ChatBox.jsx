import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import Message from "./Message";
import { getChat, sendMessage } from "../../services/index/chats";
import { SOCKET_URL } from "../../config/config";

const ChatBox = ({ currentChat }) => {
  const conversationId = currentChat._id;
  const userState = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});
  const socket = useRef();

  const { isLoading, isError } = useQuery({
    queryKey: ["getChat", conversationId],
    queryFn: () => getChat(conversationId),
    onSuccess: (data) => setMessages(data),
    onError: (error) => {
      toast.error(error.message);
      // console.log(error)
    },
  });

  // console.log(currentChat)

  const handleSubmit = async (e) => {
    e.target.value = e.target.value.trim();
    if (e.target.value !== "") {
      e.preventDefault();
      // refetch();
      const receiver = currentChat.members.find(
        (member) => member._id !== userState.userInfo._id
      );
      // console.log(receiver)
      socket.current.emit("sendMessage", {
        senderId: userState.userInfo._id,
        receiverId: receiver._id,
        message: newMessage,
      });
      const messageSent = await sendMessage(
        conversationId,
        userState.userInfo._id,
        newMessage
      );
      setMessages([...messages, messageSent]);
      setNewMessage("");
    }
  };

  // const { data: messageSent, refetch } = useQuery({
  //   queryKey: ["send"],
  //   queryFn: () => {
  //     sendMessage(conversationId, userState.userInfo._id, newMessage);
  //   },
  //   onSuccess: setNewMessage(""),
  //   onError: (error) => {
  //     toast.error(error.message);
  //     // console.log(error)
  //   },
  //   enabled: false,
  // });

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // console.log(currentChat)
    socket.current = io(SOCKET_URL);
    // socket.current.on("getMessage", (data) => {
    //   console.log("received msg")
    //   setArrivalMessage({
    //     senderId: data.senderId,
    //     message: data.message,
    //     createdAt: Date.now(),
    //   });
    // }
    // );

    return () => socket.current.disconnect();
  }, []);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      // console.log("received msg")
      setArrivalMessage({
        senderId: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  });

  useEffect(() => {
    socket.current.emit("addUser", userState.userInfo._id);
    socket.current.on("getUsers", (users) => {
      // users are people who are online
      // console.log(users);
    });
  }, [userState.userInfo]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.some(
        (member) => member._id === arrivalMessage?.senderId
      ) &&
      setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  return (
    !isLoading &&
    !isError && (
      <div className="flex-1 p-5 z-0">
        <div className="flex flex-col h-[85%] overflow-y-auto pr-4">
          {messages.map((message) => (
            <div ref={scrollRef}>
              <Message
                message={message}
                isSelf={message.senderId === userState.userInfo._id}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center">
          <textarea
            className="border rounded-lg px-2 py-2 w-full h-24 mr-3"
            placeholder="Type message here"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            onKeyDown={onEnterPress}
          ></textarea>
          <button
            onClick={handleSubmit}
            value={newMessage}
            className="border-none rounded-lg px-8 py-9 bg-green-500 text-white"
          >
            Send
          </button>
        </div>
      </div>
    )
  );
};

export default ChatBox;
