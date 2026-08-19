import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import type { NotificationItem } from "../types/notification";

interface NotificationCardProps {
  notification: NotificationItem;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "—";

  return new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(135deg, rgba(25,118,210,0.04), rgba(255,255,255,1))",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2.5, pb: "16px !important" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "white",
              flexShrink: 0,
            }}
          >
            <NotificationsNoneOutlinedIcon fontSize="small" />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1,
                mb: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {notification.title}
              </Typography>

              <Chip
                label={formatDate(notification.createdAt)}
                size="small"
                sx={{
                  backgroundColor: "rgba(25,118,210,0.08)",
                  color: "primary.main",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {notification.body}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
