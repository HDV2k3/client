import axios, { AxiosResponse } from "axios";
import { ChatDTO, ChatMessage, ChatStatus } from "../types/ChatType";

const API_URL_CHATTING = process.env.NEXT_PUBLIC_API_URL_CHATTING;

if (!API_URL_CHATTING) {
  throw new Error(
    "NEXT_PUBLIC_API_URL_CHATTING is not defined in the .env.local file"
  );
}

// API functions
export const markMessagesStatus = async (
  chatId: number,
  token: string,
  status: ChatStatus
): Promise<ChatDTO> => {
  try {
    const response: AxiosResponse<ChatDTO> = await axios.put(
      `${API_URL_CHATTING}/api/v1/chat/${chatId}/status`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { status },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw error;
  }
};

export const markMessagesAsDelivered = async (
  userId: number,
  token: string
): Promise<void> => {
  try {
    await axios.put(
      `${API_URL_CHATTING}/api/v1/chat/mark-delivered/${userId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error marking messages as delivered:", error);
    throw error;
  }
};

export const getChatHistory = async (
  senderId: number,
  receiverId: number,
  token: string
): Promise<ChatMessage[]> => {
  try {
    const response: AxiosResponse<ChatMessage[]> = await axios.get(
      `${API_URL_CHATTING}/api/v1/chat/history`,
      {
        params: { senderId, receiverId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};
