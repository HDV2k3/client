"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "antd";
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa";

const ChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Specify the type for useParams
  const [messages, setMessages] = useState<
    {
      id: number;
      sender: string;
      content: string;
      timestamp: string;
      isSent: boolean;
    }[]
  >([
    {
      id: 1,
      sender: "User A",
      content: "Hello!",
      timestamp: "09:30 AM",
      isSent: true,
    },
    {
      id: 2,
      sender: "User B",
      content: "Hi! How are you?",
      timestamp: "09:31 AM",
      isSent: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Define type for ref

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "User A",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSent: true,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Avatar src="/api/placeholder/40/40" size={40} />
        <h2 className="text-lg font-semibold">Chat with User {id}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? "justify-end" : "justify-start"} mb-1`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                msg.isSent
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-3 p-3 border-t bg-white"
      >
        <button type="button" className="text-gray-400 hover:text-gray-500">
          <FaSmile className="w-5 h-5" />
        </button>
        <button type="button" className="text-gray-400 hover:text-gray-500">
          <FaPaperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="text-blue-500 hover:text-blue-600">
          <FaPaperPlane className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatDetail;
