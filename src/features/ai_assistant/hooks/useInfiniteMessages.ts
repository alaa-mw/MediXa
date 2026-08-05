import { useInfiniteQuery } from "@tanstack/react-query";
import type { ConversationMessagesResponse } from "../types/conversationMessagesTypes";
import APIClient from "../../../shared/api/api-client";

const getClient = (conversationId: number) =>
  new APIClient<ConversationMessagesResponse>(
    `/chatting/conversations/${conversationId}/messages`,
  );

export const useInfiniteConversationMessages = (
  conversationId: number | undefined,
) => {
  return useInfiniteQuery({
    queryKey: ["conversation-messages", conversationId],
    queryFn: ({ pageParam = 1 }) => {
      return getClient(conversationId!).get({
        page: pageParam as number,
        limit: 20,
      });
    },
    enabled: !!conversationId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
    select: (data) => ({
      ...data,
      pages: [...data.pages].reverse(),
    }),
  });
};
