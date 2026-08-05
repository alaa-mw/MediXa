import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../../../shared/api/api-client";
import type { ConversationsResponse } from "../types/conversationLitstTypes";

export const useInfiniteConversations = (limit: number = 10) => {
  const apiClient = new APIClient<ConversationsResponse>(
    "/chatting/conversations",
  );

  return useInfiniteQuery({
    queryKey: ["chatting-conversations-infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get({ page: pageParam, limit });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.meta) {
        const { page, totalPages, hasNextPage } = lastPage.meta;
        if (hasNextPage && page < totalPages) {
          return page + 1;
        }
      }
      return undefined;
    },
  });
};
