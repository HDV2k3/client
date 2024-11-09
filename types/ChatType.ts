// Define interfaces for the data structures
export interface ChatMessage {
  decryptedContent?: string;
  content: string;
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  messageSender: string;
  messageType: string;
  status: string;
  sentAt: string;
  deliveredAt: string;
  readAt: string;
  urlFile: string;
  // Add other properties as needed
}

export interface ChatDTO {
  id: string;
  messages: ChatMessage[];
  // Add other properties as needed
}

// Define types for the function parameters
export type ChatStatus = "READ" | "DELIVERED" | "SENT";
