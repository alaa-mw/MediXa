import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socketService } from "../services/socketSercvice";
import getFailureMessage from "../types/chatFailureMessage";
import type { ConversationItem } from "../types/conversationLitstTypes";
import type { ConversationTurnItem } from "../types/conversationMessagesTypes";
import type {
  ChatRequestFailedPayload,
  ChatRequestSucceededPayload,
} from "../types/socket.types";

interface ChatConnectionReadyPayload {
  ragConversationId?: number;
  conversationId?: number;
  message?: string;
  [key: string]: unknown;
}

const logSocketEvent = (label: string, payload?: unknown) => {
  if (payload === undefined) {
    console.log(`[WebSocket] ${label}`);
    return;
  }

  console.log(`[WebSocket] ${label}:`, payload);
};

const updateConversationMessages = (
  queryClient: ReturnType<typeof useQueryClient>,
  payload: ChatRequestSucceededPayload,
) => {
  queryClient.setQueryData(
    ["conversation-messages", payload.ragConversationId],
    (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.map((turn: ConversationTurnItem) => {
            if (turn.ragRequestId !== payload.ragRequestId) {
              return turn;
            }

            return {
              ...turn,
              status: payload.status,
              finishedAt: payload.finishedAt,
              latencyMs: payload.latencyMs,
              assistantMessage: payload.assistantMessage,
            };
          }),
        })),
      };
    },
  );
};

const updateConversationTitle = (
  queryClient: ReturnType<typeof useQueryClient>,
  payload: ChatRequestSucceededPayload,
) => {
  if (!payload.conversationTitle) return;

  queryClient.setQueryData(
    ["chatting-conversations-infinite"],
    (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.map((conversation: ConversationItem) => {
            if (conversation.ragConversationId !== payload.ragConversationId) {
              return conversation;
            }

            return {
              ...conversation,
              title: payload.conversationTitle,
            };
          }),
        })),
      };
    },
  );
};

const updateFailedConversationMessage = (
  queryClient: ReturnType<typeof useQueryClient>,
  payload: ChatRequestFailedPayload,
) => {
  queryClient.setQueryData(
    ["conversation-messages", payload.ragConversationId],
    (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.map((turn: ConversationTurnItem) => {
            if (turn.ragRequestId !== payload.ragRequestId) {
              return turn;
            }

            return {
              ...turn,
              status: "FAILED",
              failureCode: payload.failureCode || "UNKNOWN_ERROR",
              errorMessage: getFailureMessage(payload.failureCode || ""),
              finishedAt: payload.finishedAt,
            };
          }),
        })),
      };
    },
  );
};

interface UseChatSocketProps {
  accessToken: string | null;
}

export const useChatSocket = ({ accessToken }: UseChatSocketProps) => {
  const queryClient = useQueryClient();
  const [isSocketReady, setIsSocketReady] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const socket = socketService.connect(accessToken);

    const handleConnect = () => {
      logSocketEvent("connected", { socketId: socket.id });
      setIsSocketReady(false);
    };

    const handleConnectionReady = (payload: ChatConnectionReadyPayload) => {
      logSocketEvent("chat.connection.ready", payload);
      setIsSocketReady(true);
    };

    const handleSucceeded = (payload: ChatRequestSucceededPayload) => {
      logSocketEvent("chat.request.succeeded", payload);
      updateConversationMessages(queryClient, payload);
      updateConversationTitle(queryClient, payload);
    };

    const handleFailed = (payload: ChatRequestFailedPayload) => {
      logSocketEvent("chat.request.failed", payload);
      updateFailedConversationMessage(queryClient, payload);
    };

    const handleConnectError = (error: Error & { data?: unknown }) => {
      logSocketEvent("connect_error", {
        message: error.message,
        data: error.data,
      });
    };

    const handleDisconnect = (reason: string) => {
      logSocketEvent("disconnected", { reason });
    };

    socket.on("connect", handleConnect);
    socket.on("chat.connection.ready", handleConnectionReady);
    socket.on("chat.request.succeeded", handleSucceeded);
    socket.on("chat.request.failed", handleFailed);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("chat.connection.ready", handleConnectionReady);
      socket.off("chat.request.succeeded", handleSucceeded);
      socket.off("chat.request.failed", handleFailed);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
      setIsSocketReady(false);
      socketService.disconnect();
      console.log(" [WebSocket] Disconnected and cleaned up at:", new Date());
    };
  }, [accessToken, queryClient]);

  return { isSocketReady };
};
