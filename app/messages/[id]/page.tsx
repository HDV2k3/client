"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  List,
  Avatar,
  Spin,
  Typography,
  message,
} from "antd";
import {
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import WebSocketConnection from "../../../service/Websocket";
import { ChatMessage } from "../../../types/ChatType";
import axios from "axios";
import EncryptionService from "../../../service/EncryptionService";
import { useParams, useRouter } from "next/navigation";
import { getChatHistory, markMessagesAsDelivered } from "@/service/ChatService";

const { Title } = Typography;

interface MessageResponse {
  data: {
    id: number;
    senderId: number;
    receiverId: number;
    messageEncryptForSender: string;
    messageEncryptForReceiver: string;
    messageType: string;
    sentAt: string;
    chatStatus: {
      status: string;
      deliveredAt: string;
      readAt: string | null;
    };
  }[];
  message: string;
  responseCode: number;
}

const ChatDetail: React.FC = () => {
  const [form] = Form.useForm();
  const [webSocketService, setWebSocketService] =
    useState<WebSocketConnection | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState<string>("Unknown User");
  const [showChat, setShowChat] = useState(true);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const lastTypingTimeRef = useRef<number>(0);
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarSender = localStorage.getItem("avatarMain");
  const router = useRouter();
  const { id: receiverId } = useParams() as { id: string };

  const handleGoBack = () => {
    router.push("/messages");
  };

  const toggleChatVisibility = () => {
    setShowChat((prevState) => !prevState);
  };

  const senderId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_USER}/users/get-by-id/${receiverId}`
        );
        const firstName = response.data.data.firstName;
        const lastName = response.data.data.lastName;
        const avatar = response.data.data.avatar;
        setAvatar(avatar);
        setFullName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setFullName("Unknown User");
      }
    };

    fetchUserDetails();
  }, [receiverId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const decryptMessage = async (chat: any): Promise<ChatMessage> => {
    try {
      const encryptedMessage =
        chat.senderId === senderId
          ? chat.messageEncryptForSender
          : chat.messageEncryptForReceiver;
      if (!encryptedMessage) throw new Error("No encrypted message available");

      const decryptedContent = await EncryptionService.decryptMessage(
        encryptedMessage,
        senderId,
        +receiverId
      );

      return {
        id: chat.id,
        senderId: chat.senderId,
        receiverId: chat.receiverId,
        message: decryptedContent || "No message content",
        messageType: chat.messageType,
        sentAt: chat.sentAt,
        status: chat.chatStatus?.status || "SENT",
        deliveredAt: chat.chatStatus?.deliveredAt || "",
        readAt: chat.chatStatus?.readAt || "",
        messageSender: fullName,
        content: decryptedContent || "No message content",
        urlFile: "",
      };
    } catch (error) {
      console.error("Error decrypting message:", error);
      return {
        id: chat.id,
        senderId: chat.senderId,
        receiverId: chat.receiverId,
        message: "Decryption failed",
        messageType: chat.messageType,
        sentAt: chat.sentAt,
        status: chat.chatStatus?.status || "SENT",
        deliveredAt: chat.chatStatus?.deliveredAt || "",
        readAt: chat.chatStatus?.readAt || "",
        messageSender: fullName,
        content: "Decryption failed",
        urlFile: "",
      };
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!senderId || !receiverId || !token) {
        setError("Missing required authentication data");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<MessageResponse>(
          `${process.env.NEXT_PUBLIC_API_URL_CHATTING}/api/v1/chat/history`,
          {
            params: { senderId, receiverId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.data.data) {
          setChatHistory([]);
          setLoading(false);
          return;
        }

        const decryptedChatHistory = await Promise.all(
          response.data.data.map(decryptMessage)
        );

        setChatHistory(decryptedChatHistory);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setError("Failed to fetch chat history");
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [senderId, receiverId, token]);

  useEffect(() => {
    const wsService = new WebSocketConnection();
    wsService
      .connect()
      .then(() => setWebSocketService(wsService))
      .catch((error) => {
        console.error("WebSocket connection error:", error);
        setError("Failed to connect to chat service");
      });

    return () => wsService.disconnect();
  }, []);

  useEffect(() => {
    if (webSocketService) {
      const messageSubscription = webSocketService.subscribeToPrivateMessages(
        senderId,
        +receiverId,
        async (encryptedMessage) => {
          try {
            const decryptedMessage = await decryptMessage(encryptedMessage);
            setChatHistory((prevHistory) => [...prevHistory, decryptedMessage]);
            scrollToBottom();
          } catch (error) {
            console.error("Error processing incoming message:", error);
            message.error("Failed to process incoming message");
          }
        }
      );

      const typingSubscription = webSocketService.subscribeToTyping(
        senderId,
        +receiverId,
        () => {
          setIsTyping(true);
          // Tự động tắt typing indicator sau 3 giây
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 3000);
        }
      );

      return () => {
        messageSubscription.unsubscribe();
        typingSubscription.unsubscribe();
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }
  }, [senderId, receiverId, webSocketService]);

  // Cleanup effect for typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleTyping = () => {
    const now = Date.now();
    const TYPING_THROTTLE = 2000; // 2 seconds throttle

    // Only send typing event if enough time has passed since last event
    if (now - lastTypingTimeRef.current > TYPING_THROTTLE) {
      if (newMessage.trim() && webSocketService) {
        webSocketService.sendTypingEvent(senderId, +receiverId);
        lastTypingTimeRef.current = now;
      }
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Auto-reset typing state after 3 seconds of no typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    if (!webSocketService) {
      console.error("WebSocketService is not initialized.");
      return;
    }

    try {
      await webSocketService.sendMessage(
        senderId,
        +receiverId,
        newMessage,
        "TEXT",
        null
      );
      setNewMessage("");
      setIsTyping(false); // Reset typing state after sending
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      scrollToBottom();
      await markMessagesAsDelivered(senderId, token || "");
      const updatedHistory = await getChatHistory(
        senderId,
        +receiverId,
        token || ""
      );
      const decryptedHistory = await Promise.all(
        updatedHistory.map(decryptMessage)
      );
      setChatHistory(decryptedHistory as ChatMessage[]);
    } catch (error) {
      console.log("error", error);
      // message.error("Failed to send message");
    }
  };
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4 md:p-6 bg-gray-50 rounded-lg shadow-lg h-auto md:h-[883px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-4 py-2 bg-white rounded-lg shadow-sm border">
        <Title
          level={4}
          className="text-lg md:text-xl lg:text-2xl m-0 font-semibold text-gray-800"
        >
          {`Trò chuyện với ${fullName}`}
        </Title>

        <div className="flex gap-2">
          <Button
            type="default"
            onClick={handleGoBack}
            className="flex items-center justify-center w-10 h-10 p-0 border border-gray-300 rounded-lg hover:border-gray-400"
            icon={<CloseOutlined className="text-lg text-gray-600" />}
          />
          <Button
            type="default"
            onClick={toggleChatVisibility}
            className="flex items-center justify-center w-10 h-10 p-0 border border-gray-300 rounded-lg hover:border-gray-400"
            icon={
              showChat ? (
                <EyeInvisibleOutlined className="text-lg text-gray-600" />
              ) : (
                <EyeOutlined className="text-lg text-gray-600" />
              )
            }
          />
        </div>
      </div>

      {showChat && (
        <>
          {loading ? (
            <div className="flex justify-center items-center flex-1 h-64">
              <Spin size="large" tip="Loading chat history..." />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4 text-sm md:text-base">
              {error}
            </div>
          ) : (
            <div className="flex flex-col flex-1 h-full space-y-4">
              {/* Chat Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-md border"
              >
                <List
                  dataSource={chatHistory}
                  renderItem={(message) => (
                    <List.Item
                      key={message.id}
                      className={`flex ${
                        message.senderId === senderId
                          ? "justify-end"
                          : "justify-start"
                      } px-2`}
                    >
                      {message.senderId !== senderId && (
                        <Avatar
                          icon={<UserOutlined />}
                          src={avatar}
                          className="bg-gray-400 mr-2 w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
                        />
                      )}

                      <div className="flex flex-col items-start space-y-1 max-w-[75%] md:max-w-[60%]">
                        <div
                          className={`p-3 rounded-lg text-sm md:text-base break-words ${
                            message.senderId === senderId
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {message.message}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 self-end">
                          {new Date(message.sentAt).toLocaleString()}
                        </div>
                      </div>

                      {message.senderId === senderId && (
                        <Avatar
                          src={avatarSender}
                          icon={<UserOutlined />}
                          className="bg-blue-600 ml-2 w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
                        />
                      )}
                    </List.Item>
                  )}
                />
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="text-xs md:text-sm text-gray-500 text-center">
                  {`${fullName} is typing...`}
                </div>
              )}

              {/* Message Input */}
              <Form
                form={form}
                className="flex items-center space-x-2 p-2 md:p-4 bg-white rounded-lg shadow-md border"
              >
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleTyping}
                  onPressEnter={handleSendMessage}
                  className="flex-grow p-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="primary"
                  onClick={handleSendMessage}
                  className="h-10 md:h-12 px-4 md:px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
                >
                  Send
                </Button>
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatDetail;
