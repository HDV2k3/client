import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { SOCKET_URL } from "./constants";
import EncryptionService from "./EncryptionService";
const firebaseConfig = {
  apiKey: "AIzaSyA4Ag0VmCDlE_Fe0MN_Gf4FxSPfkIJl8Dc",
  authDomain: "datpt-ce669.firebaseapp.com",
  projectId: "datpt-ce669",
  storageBucket: "datpt-ce669.appspot.com",
  messagingSenderId: "260416818401",
  appId: "1:260416818401:web:667ed6988793879d0d3ba0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

class WebSocketConnection {
  client: Client;
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {},
      debug: function (str) {
        console.log("[STOMP DEBUG]:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  connect() {
    return new Promise<void>((resolve, reject) => {
      console.log("Activating WebSocket client...");
      this.client.activate();
      this.client.onConnect = () => {
        console.log("Connected to WebSocket");
        resolve();
      };
      this.client.onStompError = (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
        reject(new Error("STOMP error"));
      };
      this.client.onWebSocketError = (event) => {
        console.error("WebSocket error:", event);
        reject(new Error("WebSocket connection error"));
      };
      this.client.onWebSocketClose = (event) => {
        console.log("WebSocket closed:", event);
      };
    });
  }

  disconnect() {
    if (this.client) {
      console.log("Deactivating WebSocket client...");
      this.client.deactivate();
    }
  }
  public async sendMessage(
    senderId: number,
    receiverId: number,
    message: string,
    messageType: string,
    file: File | null,
    fileUrl: string | null = null
  ): Promise<void> {
    if (!message.trim()) {
      console.error("Message content is empty");
      throw new Error("Message content is required");
    }
    const newMessage = {
      senderId,
      receiverId,
      message,
      messageType,
      fileUrl: fileUrl || null, // Ensure fileUrl is not undefined
    };

    if (file) {
      try {
        console.log("Uploading file to Firebase...");
        const uploadedFileUrl = await this.uploadFileToFirebase(file);
        newMessage.fileUrl = uploadedFileUrl; // Assign the uploaded file URL
        newMessage.message = ""; // If a file is attached, message content becomes empty
        console.log("File uploaded to Firebase:", uploadedFileUrl);
      } catch (error) {
        console.error("Error uploading file to Firebase:", error);
        throw error;
      }
    }

    if (!newMessage.message && !newMessage.fileUrl) {
      console.error("Message content and file are both missing");
      throw new Error("Message content or file is required");
    }

    console.log("Sending message:", newMessage);
    return this.publishMessage(newMessage);
  }

  subscribeToPrivateMessages(
    userId1: number,
    userId2: number,
    callback: (message: string) => void
  ) {
    const chatTopic = `/topic/private-chat-${Math.min(userId1, userId2)}-${Math.max(userId1, userId2)}`;
    console.log(`Subscribing to messages for chat ${chatTopic}`);
    return this.client.subscribe(chatTopic, async (message) => {
      console.log("Encrypted message:", message.body);
      const encryptedMessage = JSON.parse(message.body);

      // Select the correct encrypted field based on senderId
      const messageToDecrypt =
        encryptedMessage.senderId === userId1
          ? encryptedMessage.messageEncryptForSender
          : encryptedMessage.messageEncryptForReceiver;

      try {
        // Decrypt the selected message content
        const decryptedContent = await EncryptionService.decryptMessage(
          messageToDecrypt,
          userId1,
          userId2
        );

        // Pass decrypted message to the callback
        /**
         * Uploads a file to Firebase Storage and returns its download URL.
         * @param file The file to upload
         * @returns The download URL of the uploaded file
         */
        callback({ ...encryptedMessage, decryptedContent });
      } catch (error) {
        console.error("Error decrypting message in real-time:", error);
      }
    });
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /******  200f86e5-7626-4de2-a3bf-bcbe520f8329  *******/
  public async uploadFileToFirebase(file: File): Promise<string> {
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      "chat_files/" + Date.now() + "_" + file.name
    );

    try {
      console.log("Starting file upload...");
      const snapshot = await uploadBytes(storageRef, file);
      console.log("File uploaded, getting download URL...");
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File download URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file to Firebase:", error);
      throw error;
    }
  }
  public publishMessage(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log("Publishing message:", message);
        this.client.publish({
          destination: "/app/chat.sendMessage",
          body: JSON.stringify(message),
          headers: { "content-type": "application/json" },
        });
        console.log("Message published successfully");
        resolve();
      } catch (error) {
        console.error("Error publishing message:", error);
        reject(error);
      }
    });
  }
  public subscribeToTyping(
    currentUserId: number,
    otherUserId: number,
    callback: (typingEvent: any) => void
  ) {
    const typingTopic = `/topic/typing-${currentUserId}-${otherUserId}`;
    console.log(`Subscribing to typing events for topic ${typingTopic}`);
    return this.client.subscribe(typingTopic, (message) => {
      console.log("Received typing event:", message);
      const typingEvent = JSON.parse(message.body);
      callback(typingEvent);
    });
  }

  subscribeToMessageStatus(
    chatId: number,
    callback: (statusUpdate: any) => void
  ) {
    const messageStatusTopic = `/topic/message-status-${chatId}`;
    console.log(
      `Subscribing to message status updates for chat ${messageStatusTopic}`
    );
    return this.client.subscribe(messageStatusTopic, (message) => {
      console.log("Received message status update:", message);
      const statusUpdate = JSON.parse(message.body);
      callback(statusUpdate);
    });
  }

  sendTypingEvent(senderId: number, receiverId: number): void {
    const typingEvent = { senderId, receiverId };
    console.log("Sending typing event:", typingEvent);
    this.client.publish({
      destination: "/app/chat.typing",
      body: JSON.stringify(typingEvent),
    });
  }
}

export default WebSocketConnection;
