import type { ChatResponse } from "../types/chat.types";

class AIAssistantService {
  async sendMessage(sessionId: string, message: string): Promise<ChatResponse> {
    return apiClient.post("/assistant/chat", {
      sessionId,
      message,
    });
  }

  async getSessions() {
    return apiClient.get("/assistant/sessions");
  }

  async getMessages(sessionId: string) {
    return apiClient.get(`/assistant/sessions/${sessionId}`);
  }
}

export default new AIAssistantService();
