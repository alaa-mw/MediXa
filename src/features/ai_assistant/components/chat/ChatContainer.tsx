import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";
import { useEffect, useRef } from "react";
import type { ConversationTurnItem } from "../../types/conversationMessagesTypes";

interface ChatContainerProps {
  turns: ConversationTurnItem[];
  onLoadMoreMessages: () => void;
  hasMoreMessages: boolean;
  isLoadingMore: boolean;
}

const ChatContainer = ({
  turns,
  onLoadMoreMessages,
  hasMoreMessages,
  isLoadingMore,
}: ChatContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const prevTurnsLengthRef = useRef<number>(turns.length);

  const scrollToBottom = (smooth = false) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    const isNewMessageAdded = turns.length > prevTurnsLengthRef.current;

    if (isNewMessageAdded || prevTurnsLengthRef.current === 0) {
      scrollToBottom(true);
    } else {
      scrollToBottom(false);
    }

    prevTurnsLengthRef.current = turns.length;
  }, [turns]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop <= 50 && hasMoreMessages && !isLoadingMore) {
      prevScrollHeightRef.current = target.scrollHeight;
      onLoadMoreMessages();
    }
  };

  useEffect(() => {
    if (containerRef.current && prevScrollHeightRef.current > 0) {
      const newScrollHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop =
        newScrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    }
  }, [turns]);

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        px: 4,
        py: 2,
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {isLoadingMore && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {turns.map((turn) => {
        const userTime = turn.userMessage?.createdAt
          ? new Date(turn.userMessage.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";

        const assistantTime = turn.finishedAt
          ? new Date(turn.finishedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";

        const formattedSources = turn.assistantMessage?.citations?.map((c) => ({
          title: c.title,
          page: c.page,
        }));

        const isLoading =
          turn.status === "PENDING" ||
          turn.status === "RUNNING" ||
          turn.status === "PROCESSING";

        return (
          <Box
            key={turn.ragRequestId}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              mb: 2,
            }}
          >
            {/* رسالة المستخدم تبقى كما هي */}
            <UserMessage
              message={turn.userMessage?.content || ""}
              time={userTime}
            />

            {/* **التحقق من حالة الخطأ لعرض الصندوق المميز مكان الرد** */}
            {turn.status === "FAILED" ? (
              <Box
                sx={{ mt: 1, display: "flex", justifyContent: "flex-start" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "error.lighter",
                    border: "1px solid",
                    borderColor: "error.light",
                    borderRadius: 3,
                    maxWidth: "85%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <ErrorOutlineRoundedIcon color="error" sx={{ mt: 0.3 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="error.dark"
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      فشل في معالجة الطلب
                    </Typography>
                    <Typography variant="body2" color="error.main">
                      {turn.errorMessage ||
                        "حدث خطأ غير معروف أثناء معالجة رسالتك."}
                    </Typography>
                    {turn.failureCode && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          mt: 1,
                          fontFamily: "monospace",
                        }}
                      >
                        رمز الخطأ: {turn.failureCode}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Box>
            ) : (
              /* العرض الطبيعي للرد (في حال لم يكن هناك خطأ) */
              <AssistantMessage
                time={assistantTime}
                message={turn.assistantMessage?.content || "جاري توليد الرد..."}
                sources={
                  formattedSources && formattedSources.length > 0
                    ? formattedSources
                    : undefined
                }
                isLoading={isLoading}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatContainer;
