import { API_URL } from "./constants";

interface DecryptionResponse {
  data: string;
  status: string;
}

class EncryptionService {
  static async decryptMessage(
    messages: string,
    senderId: number,
    receiverId: number
  ): Promise<string> {
    const currentUserId = Number(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing");
    }

    try {
      const response = await fetch(
        `${API_URL}/api/v1/encryption/decrypt?senderId=${senderId}&receiverId=${receiverId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ messages }),
        }
      );

      if (!response.ok) {
        throw new Error(`Decryption failed with status: ${response.status}`);
      }

      const result: DecryptionResponse = await response.json();

      if (!result.data) {
        throw new Error("Received empty decrypted message");
      }

      return result.data;
    } catch (error) {
      console.error("Error decrypting message:", error);
      throw error;
    }
  }

  static async getPrivateKey(): Promise<void> {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token is missing");

    try {
      const response = await fetch(`${API_URL}/api/v1/encryption/private-key`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get private key: ${response.status}`);
      }

      const { privateKey } = await response.json();
      localStorage.setItem("privateKey", privateKey);
    } catch (error) {
      console.error("Error getting private key:", error);
      throw error;
    }
  }
}

export default EncryptionService;
