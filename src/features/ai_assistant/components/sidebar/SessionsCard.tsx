import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import SessionItem from "./SessionItem";
import type { ConversationItem } from "../../types/conversationLitstTypes";
import AddSessionItem from "./AddSessionItem";

interface SessionsCardProps {
  onNewSession: () => void;
  conversations?: ConversationItem[];
  isLoading?: boolean;
  onSelectSession?: (conversationId: number) => void;
  activeSessionId?: number;
}

const SessionsCard = ({
  onNewSession,
  conversations = [],
  isLoading = false,
  onSelectSession,
  activeSessionId,
}: SessionsCardProps) => {
  const formatTimeLabel = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: "transparent",
      }}
    >
      <Stack
        direction="row"
        sx={{
          mb: 2,
          mt: 1,
          gap: 1,
          alignItems: "center",
        }}
      >
        <HistoryRoundedIcon color="primary" />
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          جلسات سابقة
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        {/* زر إنشاء جلسة جديدة */}
        <AddSessionItem
          title="جلسة جديدة"
          subtitle="+ إضافة"
          onClick={onNewSession}
        />

        {/* عرض المحادثات */}
        {conversations.map((conv) => (
          <Box
            key={conv.ragConversationId}
            onClick={() => onSelectSession?.(conv.ragConversationId)}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              bgcolor:
                activeSessionId === conv.ragConversationId
                  ? "action.selected"
                  : "transparent",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <SessionItem
              title={conv.title}
              time={formatTimeLabel(conv.createdAt)}
              isActive={activeSessionId === conv.ragConversationId}
            />
          </Box>
        ))}

        {/* مؤشر التحميل عند جلب المزيد من العناصر أو التحميل الأولي */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={22} />
          </Box>
        )}

        {/* في حال الفراغ تماماً */}
        {!isLoading && conversations.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ py: 2 }}
          >
            لا توجد جلسات سابقة.
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default SessionsCard;
