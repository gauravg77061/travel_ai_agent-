import React, { useEffect, useState, useRef } from "react";

import axios from "axios";

import socket from "../services/socket";

import { useParams } from "react-router-dom";

import BASE_URL from "../services/axios";

import { useSelector } from "react-redux";

import { SendHorizonal, Bot } from "lucide-react";

const ChatPage = () => {

  const { groupId } = useParams();

  const [groupData, setGroupData] = useState(null);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const user = useSelector((store) => store.auth.user);

  const messagesEndRef = useRef(null);

  // Fetch Group Details
  const fetchGroupDetails = async () => {

    try {

      const response = await axios.get(
        BASE_URL + `group/${groupId}`,
        {
          withCredentials: true,
        }
      );

      setGroupData(response?.data?.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch Messages
  const fetchMessages = async () => {

    try {

      const response = await axios.get(
        BASE_URL + `message/${groupId}`,
        {
          withCredentials: true,
        }
      );

      setMessages(response?.data?.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Send Message
  const sendMessage = () => {

    try {

      if (!text.trim()) {
        return;
      }

      socket.emit("send_message", {
        groupId,
        senderId: user?._id,
        text,
      });

      setText("");

    } catch (error) {

      console.log(error);

    }

  };

  // Initial Load
  useEffect(() => {

    fetchGroupDetails();

    fetchMessages();

    socket.emit("join_group", groupId);

  }, []);

  // Receive Realtime Messages
  useEffect(() => {

    socket.on("receive_message", (newMessage) => {

      setMessages((prev) => [...prev, newMessage]);

    });

    return () => {

      socket.off("receive_message");

    };

  }, []);

  // Auto Scroll
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  return (

    <div className="h-screen bg-linear-to-br from-black via-zinc-950 to-black text-white flex flex-col overflow-hidden">

      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-5 bg-black/40 backdrop-blur-xl flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">

            {groupData?.name}

          </h1>

          <p className="text-zinc-400 mt-1">

            Realtime AI Group Chat

          </p>

        </div>

        <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-4 py-2 rounded-2xl text-sm font-semibold">

          Live

        </div>

      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">

        {messages.map((msg) => {

          const isCurrentUser =
            msg?.senderId?._id === user?._id;

          const isAI = msg?.role === "ai";

          return (

            <div
              key={msg?._id}
              className={`flex ${
                isCurrentUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[70%] px-5 py-4 rounded-3xl shadow-xl transition-all duration-300 ${
                  isAI
                    ? "bg-cyan-950 border border-cyan-500 text-white"
                    : isCurrentUser
                    ? "bg-cyan-500 text-black"
                    : "bg-zinc-900 border border-zinc-800 text-white"
                }`}
              >

                {/* Sender */}
                <div className="flex items-center gap-2 mb-2">

                  {isAI && (
                    <Bot size={18} className="text-cyan-400" />
                  )}

                  <p
                    className={`text-sm font-semibold ${
                      isAI
                        ? "text-cyan-300"
                        : isCurrentUser
                        ? "text-black"
                        : "text-zinc-300"
                    }`}
                  >

                    {isAI
                      ? "TripSync AI"
                      : isCurrentUser
                      ? "You"
                      : `${msg?.senderId?.firstName}`}

                  </p>

                </div>

                {/* Message */}
                <p className="leading-relaxed text-[16px]">

                  {msg?.text}

                </p>

              </div>

            </div>

          );

        })}

        {/* Auto Scroll Ref */}
        <div ref={messagesEndRef}></div>

      </div>

      {/* Input Section */}
      <div className="border-t border-zinc-800 bg-black/50 backdrop-blur-xl px-6 py-5">

        <div className="flex items-center gap-4">

          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none text-white focus:border-cyan-500 transition-all duration-300"
          />

          <button
            onClick={sendMessage}
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-semibold px-6 py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/30"
          >

            <SendHorizonal size={22} />

          </button>

        </div>

      </div>

    </div>

  );

};

export default ChatPage;