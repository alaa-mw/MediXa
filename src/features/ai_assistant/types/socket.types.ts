import type { ConversationItem } from "./conversationLitstTypes";
import type {
  ConversationTurnItem,
  MessageDetailItem,
} from "./conversationMessagesTypes";

export interface ChatRequestSucceededPayload {
  ragConversationId: ConversationTurnItem["ragConversationId"];
  ragRequestId: ConversationTurnItem["ragRequestId"];
  conversationTitle?: ConversationItem["title"];
  status: ConversationTurnItem["status"];
  finishedAt: ConversationTurnItem["finishedAt"];
  latencyMs: ConversationTurnItem["latencyMs"];
  assistantMessage: MessageDetailItem;
}

export interface ChatRequestFailedPayload {
  ragConversationId: ConversationTurnItem["ragConversationId"];
  ragRequestId: ConversationTurnItem["ragRequestId"];
  failureCode?: string | null;
  finishedAt: ConversationTurnItem["finishedAt"];
}
