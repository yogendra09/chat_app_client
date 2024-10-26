import React, { useEffect, useRef, useState } from "react";
import SendingMessage from "../message/SendingMessage";
import ReceivingMessage from "../message/ReceivingMesaage";
import { IoMdSend } from "react-icons/io";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";
import { MdAttachFile } from "react-icons/md";

const ChatArea = ({ chatPartner, displayMsg, setdisplayMsg }) => {
  const containerRef = useRef(null);
  const [newMessage, setnewMessage] = useState("");
  const { user } = useSelector((state) => state.userReducer);

  const sendnewPrivateMessage = () => {
    if (newMessage.trim() === "") return;
    const message = {
      sender: user.username,
      receiver: chatPartner.username,
      message: newMessage,
      date: Date.now(),
    };
    setdisplayMsg((prev) => [...prev, message]);
    socket.emit("sendPrivateMessage", message);
    setnewMessage("");
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data.sender === chatPartner.username) {
        setdisplayMsg((prev) => [...prev, data]);
      }
    };

    socket.on("receive_private_message", handleReceiveMessage);

    return () => socket.off("receive_private_message", handleReceiveMessage);
  }, [chatPartner.username, setdisplayMsg]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayMsg]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-black overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={chatPartner && chatPartner.image.url}
              alt=""
            />
          </div>
          <h1 className="text-lg font-semibold">{chatPartner && chatPartner.username}</h1>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4" ref={containerRef}>
        <div className="grid grid-cols-12 gap-y-2">
          {displayMsg.map((msg, index) => (
            msg.sender === user.username ? (
              <SendingMessage
                key={index}
                message={msg.message}
                date={new Date(msg.date).toLocaleTimeString()}
              />
            ) : (
              <ReceivingMessage
                key={index}
                message={msg.message}
                date={new Date(msg.date).toLocaleTimeString()}
              />
            )
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <MdAttachFile className="text-2xl" />
          </button>
          <input
            value={newMessage}
            onChange={(e) => setnewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-grow px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onKeyPress={(e) => e.key === 'Enter' && sendnewPrivateMessage()}
          />
          <button
            onClick={sendnewPrivateMessage}
            className="flex items-center justify-center gap-1 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-2"
          >
            <span>Send</span>
            <IoMdSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
