import { Box, Stack } from "@mui/material";
import SessionsCard from "./components/sidebar/SessionsCard";
import KnowledgeCard from "./components/sidebar/KnowledgeCard";
import ChatContainer from "./components/chat/ChatContainer";
import AssistantHeader from "./components/header/AssistantHeader";
import ChatInput from "./components/input/ChatInput";
import { useAssistantChatController } from "./hooks/useAssistantChatController";

const AssistantLayout = () => {
  const {
    activeSessionId,
    conversations,
    handleLoadMoreConversations,
    handleLoadMoreMessages,
    handleNewSession,
    handleSelectSession,
    handleSendMessage,
    hasMoreMessages,
    isLoadingConversations,
    isLoadingMoreMessages,
    isPendingAction,
    lastErrorMessage,
    turns,
  } = useAssistantChatController();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Stack
        direction="row"
        sx={{ height: "100%", width: "100%", direction: "ltr" }}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            direction: "rtl",
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <KnowledgeCard />
          </Box>

          <Box
            onScroll={(event) => {
              const target = event.currentTarget;
              const isBottom =
                target.scrollHeight - target.scrollTop <=
                target.clientHeight + 20;

              if (isBottom) {
                handleLoadMoreConversations();
              }
            }}
            sx={{
              mt: 3,
              flexGrow: 1,
              overflowY: "auto",
              pr: 1,
            }}
          >
            <SessionsCard
              onNewSession={handleNewSession}
              conversations={conversations}
              isLoading={isLoadingConversations}
              onSelectSession={handleSelectSession}
              activeSessionId={activeSessionId}
            />
          </Box>
        </Box>

        <Stack direction="column" sx={{ flex: 1, height: "100%" }}>
          <AssistantHeader />
          <Box
            sx={{
              m: 1,
              height: "100%",
              width: 960,
              overflowY: "auto",
              flex: 1,
            }}
          >
            <ChatContainer
              turns={activeSessionId === undefined ? [] : turns}
              onLoadMoreMessages={handleLoadMoreMessages}
              hasMoreMessages={hasMoreMessages}
              isLoadingMore={isLoadingMoreMessages}
              errorMessage={lastErrorMessage}
            />
          </Box>
          <Box sx={{ flexShrink: 0, width: 960 }}>
            <ChatInput onSend={handleSendMessage} isLoading={isPendingAction} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AssistantLayout;
