import { useEffect, useState } from "react";
import TokenService from "../../../shared/services/tokenService";
import { useChatSocket } from "./useChatSocket";
import { useInfiniteConversations } from "./useInfiniteConversations";
import { useInfiniteConversationMessages } from "./useInfiniteMessages";
import { useSendMessage } from "./useSendNextMessage";
import { useStartConversation } from "./useSendStartMessage";
import type { ConversationItem } from "../types/conversationLitstTypes";
import type { ConversationTurnItem } from "../types/conversationMessagesTypes";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

const isConversationProcessing = (turn?: ConversationTurnItem) =>
  turn
    ? turn.status === "PROCESSING" ||
      turn.status === "PENDING" ||
      turn.status === "RUNNING"
    : false;

export const useAssistantChatController = () => {
  const { showSnackbar } = useSnackbar();
  const [activeSessionId, setActiveSessionId] = useState<number | undefined>();
  const [isNewSessionMode, setIsNewSessionMode] = useState(false);
  const [lastErrorMessage, setLastErrorMessage] = useState<string | null>(null);
  const accessToken = TokenService.getAccessToken();

  const { isSocketReady } = useChatSocket({ accessToken });

  const {
    data: convData,
    fetchNextPage: fetchNextConv,
    hasNextPage: hasNextConv,
    isFetchingNextPage: isFetchingNextConv,
    isLoading: isLoadingConv,
  } = useInfiniteConversations(8);

  const conversations: ConversationItem[] = convData
    ? convData.pages.flatMap((page) => {
        const items = page?.data;
        return Array.isArray(items) ? (items as ConversationItem[]) : [];
      })
    : [];

  useEffect(() => {
    if (
      activeSessionId === undefined &&
      !isNewSessionMode &&
      conversations.length > 0
    ) {
      setActiveSessionId(conversations[0].ragConversationId);
    }
  }, [activeSessionId, conversations, isNewSessionMode]);

  const {
    data: messagesData,
    fetchNextPage: fetchNextMessages,
    hasNextPage: hasNextMessages,
    isFetchingNextPage: isFetchingNextMessages,
  } = useInfiniteConversationMessages(activeSessionId);

  const turns: ConversationTurnItem[] = messagesData
    ? messagesData.pages.flatMap((page) => {
        const items = page?.data;
        return Array.isArray(items) ? (items as ConversationTurnItem[]) : [];
      })
    : [];

  const lastTurn = turns.at(-1);
  const isServerProcessing = isConversationProcessing(lastTurn);

  const { mutate: sendMessage, isPending: isSendingMessage } =
    useSendMessage(activeSessionId);
  const { mutate: startConversation, isPending: isStartingSession } =
    useStartConversation();

  const isPendingAction =
    isSendingMessage || isStartingSession || isServerProcessing;

  const handleLoadMoreConversations = () => {
    if (!isFetchingNextConv && hasNextConv) {
      fetchNextConv();
    }
  };

  const handleLoadMoreMessages = () => {
    if (hasNextMessages && !isFetchingNextMessages) {
      fetchNextMessages();
    }
  };

  const handleSendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isPendingAction || !isSocketReady) {
      showSnackbar(
        "Cannot send message: Chat connection is not ready yet.",
        "error",
      );
      return;
    }
    if (!trimmedText || isPendingAction) return;

    if (activeSessionId === undefined) {
      startConversation(trimmedText, {
        onSuccess: (response) => {
          const newId = response.data?.ragConversationId;

          if (newId) {
            setActiveSessionId(newId);
            setIsNewSessionMode(false);
          }
        },
        onError: (error) => {
          const msg =
            error?.message ||
            "RAG is not available for the current subscription plan.";
          setLastErrorMessage(msg);
        },
      });

      return;
    }

    sendMessage(trimmedText, {
      onError: (error) => {
        console.error("Failed to send message:", error);
      },
    });
  };

  const handleNewSession = () => {
    setActiveSessionId(undefined);
    setIsNewSessionMode(true);
  };

  const handleSelectSession = (conversationId: number) => {
    setIsNewSessionMode(false);
    setActiveSessionId(conversationId);
  };

  return {
    activeSessionId,
    conversations,
    handleLoadMoreConversations,
    handleLoadMoreMessages,
    handleNewSession,
    handleSelectSession,
    handleSendMessage,
    hasMoreMessages: Boolean(hasNextMessages),
    isLoadingConversations: isLoadingConv || isFetchingNextConv,
    isLoadingMoreMessages: isFetchingNextMessages,
    isPendingAction,
    lastErrorMessage,
    turns,
  };
};
