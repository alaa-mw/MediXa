// export interface Source {
//   id: string;
//   title: string;
//   page: number;
// }

// export interface Message {
//   id: string;
//   role: "USER" | "ASSISTANT";
//   content: string;
//   createdAt: string;
//   sources?: Source[];
// }

// export interface Session {
//   id: string;
//   title: string;
//   createdAt: string;
// }

// export interface ChatResponse {
//   success: boolean;
//   data: {
//     sessionId: string;
//     messages: Message[];
//   };
// }

// src/components/SmartAssistant/types.ts

export interface Source {
  id: string | number;
  title: string;
  page: number;
}

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  sources?: Source[];
}

export interface ChatSession {
  id: string;
  title: string;
  date: string;
}

export interface KnowledgeStats {
  indexedDocuments: number;
  lastUpdated: string;
}
