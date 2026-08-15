export interface CitationItem {
  ragMessageCitationId: number;
  position: number;
  sourceType: string;
  documentId: string;
  chunkId: string;
  title: string;
  page: number;
  snippet: string;
  score: number;
}

export interface MessageDetailItem {
  ragMessageId: number;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
  citations?: CitationItem[];
}

export interface ConversationTurnItem {
  ragRequestId: number;
  ragConversationId: number;
  turnNumber: number;
  status: string;
  failureCode: string | null;
  errorMessage?: string;
  leaseExpiresAt: string;
  startedAt: string;
  finishedAt: string;
  latencyMs: number;
  userMessage: MessageDetailItem;
  assistantMessage: MessageDetailItem;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ConversationMessagesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: ConversationTurnItem[];
  meta: PaginationMeta;
}
