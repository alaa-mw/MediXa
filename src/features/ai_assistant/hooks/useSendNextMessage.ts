import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePostData from "../../../shared/hooks/usePostData";

interface SendMessagePayload {
  clientRequestId: string;
  content: string;
}

export const useSendMessage = (conversationId: number | undefined) => {
  const queryClient = useQueryClient();

  const endpoint = conversationId
    ? `/chatting/conversations/${conversationId}/messages`
    : "/chatting/conversations/messages";

  const mutation = usePostData<SendMessagePayload>(endpoint);

  return useMutation({
    mutationFn: (content: string) => {
      if (!conversationId) {
        throw new Error("Conversation id is required to send a message.");
      }

      const payload: SendMessagePayload = {
        clientRequestId: crypto.randomUUID(),
        content,
      };
      return mutation.mutateAsync(payload);
    },
    onSuccess: () => {
      if (conversationId) {
        queryClient.invalidateQueries({
          queryKey: ["conversation-messages", conversationId],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["chatting-conversations-infinite"],
      });
    },
  });
};
