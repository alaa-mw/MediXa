import { useState } from "react";
import type { Message } from "../types/chat.types";

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { service } = new AIAssistantService();
  
  const sendMessage = async (value: string) => {
    setLoading(true);

    try {
      const response = await service.sendMessage("session-id", value);

      setMessages(response.data.messages);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
};

export default useChat;
