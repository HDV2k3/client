import EncryptionService from "../../service/EncryptionService";
import { Avatar, List, Typography, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../service/constants";

const { Text } = Typography;

interface ChatData {
  userId: number;
  firstName: string;
  lastName: string;
  lastMessage: string;
  lastMessageTime: string;
}

const MessageList: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const userId = Number(localStorage.getItem("userId"));
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          setError("User ID or token missing from localStorage.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/v1/chat/user-history?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const decryptedChatHistory = await Promise.all(
          response.data.data.map(async (chat: any) => {
            try {
              const decryptedMessage = await EncryptionService.decryptMessage(
                chat.lastMessage,
                userId,
                chat.userId
              );
              const lastMessageTime = new Date(
                chat.lastMessageTime
              ).toLocaleString("vi-VN", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return {
                userId: chat.userId,
                firstName: chat.firstName,
                lastName: chat.lastName,
                lastMessage: decryptedMessage || "No message",
                lastMessageTime,
              };
            } catch {
              return {
                userId: chat.userId,
                firstName: chat.firstName,
                lastName: chat.lastName,
                lastMessage: "Error decrypting message",
                lastMessageTime: "",
              };
            }
          })
        );

        setChatHistory(decryptedChatHistory);
      } catch {
        setError("Failed to fetch chat history.");
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchChatHistory, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (chat: ChatData) => {
    router.push(`/messages/${chat.userId}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto sm:max-w-lg md:max-w-xl">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spin tip="Loading chat history..." />
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={chatHistory}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleClick(item)}
              className="hover:bg-gray-100 transition duration-150 rounded-md cursor-pointer p-2 mb-2 shadow-sm"
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.userId}`}
                    size="large"
                  />
                }
                title={
                  <Text strong className="text-gray-800">
                    {item.firstName} {item.lastName}
                  </Text>
                }
                description={
                  <div className="flex flex-col space-y-1">
                    <Text type="secondary" ellipsis className="text-sm">
                      {item.lastMessage}
                    </Text>
                    <Text type="secondary" className="text-xs text-right">
                      {item.lastMessageTime}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default MessageList;
