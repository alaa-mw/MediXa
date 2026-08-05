export interface LatestRequest {
  ragRequestId: number;
  turnNumber: number;
  status: "SUCCEEDED" | "PROCESSING" | "FAILED" | "EXPIRED" ;
  failureCode: string | null;
  startedAt: string;
  finishedAt: string | null;
}

export interface LastMessage {
  ragMessageId: number;
  role: "USER" | "ASSISTANT" | string;
  contentPreview: string;
  createdAt: string;
}

export interface ConversationItem {
  ragConversationId: number;
  title: string;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  turnsCount: number;
  latestRequest: LatestRequest;
  lastMessage: LastMessage;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ConversationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: ConversationItem[];
  meta: PaginationMeta;
}
