import { Box } from "@mui/material";

import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";
import type { MessageItem } from "../../PharmacyAssistantLayout";
import { useEffect, useRef } from "react";

interface ChatContainerProps {
  messages: MessageItem[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        overflowY: "auto",
        flex: 1,
      }}
    >
      {messages.map((item) =>
        item.sender === "user" ? (
          <UserMessage
            key={item.id}
            message={item.message as string}
            time={item.time}
          />
        ) : (
          <AssistantMessage
            key={item.id}
            time={item.time}
            message={item.message}
            sources={item.sources}
            isLoading={item.isLoading}
          />
        ),
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatContainer;
