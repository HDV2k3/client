"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { FaRobot, FaUser } from "react-icons/fa";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "ai";
}

const Chat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newUserMessage: Message = { text: inputMessage, sender: "user" };
      setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputMessage("");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_CHAT_BOT}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: inputMessage }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const aiResponse: Message = {
          text: data.response,
          sender: "ai",
        };
        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to get response from server");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-4 rounded-full shadow-lg hover:scale-105 transition duration-300 z-50"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/datpt-ce669.appspot.com/o/logo%2FLogo.png?alt=media&token=99ab8a9e-a5e3-4990-ad30-0c8ffd4dc884')", // Đường dẫn đến ảnh
          backgroundSize: "70%", // Đảm bảo ảnh lấp đầy toàn bộ nút
          backgroundPosition: "center", // Căn giữa ảnh
          border: "none", // Loại bỏ viền mặc định
          width: "50px",
          height: "50px",
          cursor: "pointer",
          backgroundColor: "#60A5FA",
        }}
      ></button>

      {isChatOpen && (
        <div className="fixed bottom-4 right-24 w-96 h-[500px] bg-white shadow-xl rounded-lg overflow-hidden flex flex-col">
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaRobot className="mr-2" size={24} />
              <h2 className="text-xl font-bold">AI Real Estate Assistant</h2>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border border-gray-300"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      message.sender === "user" ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <FaUser className="text-white" size={12} />
                    ) : (
                      <FaRobot className="text-gray-600" size={12} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
