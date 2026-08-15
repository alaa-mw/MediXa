import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePostData from "../../../shared/hooks/usePostData";

interface StartConversationPayload {
  clientRequestId: string;
  content: string;
}

interface StartConversationResponseData {
  ragConversationId?: number;
}

export const useStartConversation = () => {
  const queryClient = useQueryClient();
  const mutation = usePostData<StartConversationResponseData>(
    "/chatting/conversations/start",
  );

  return useMutation({
    mutationFn: (content: string) => {
      const payload: StartConversationPayload = {
        clientRequestId: crypto.randomUUID(),
        content,
      };
      return mutation.mutateAsync(payload);
    },
    onSuccess: (response) => {
      // إعادة جلب قائمة المحادثات لتحديث السايدبار فوراً
      queryClient.invalidateQueries({
        queryKey: ["chatting-conversations-infinite"],
      });

      const newConversationId = response.data?.ragConversationId;
      if (newConversationId) {
        queryClient.invalidateQueries({
          queryKey: ["conversation-messages", newConversationId],
        });
      }
    },
  });
};
