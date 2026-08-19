import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import type { NotificationItem, NotificationMeta } from "../types/notification";
import NotificationCard from "./NotificationCard";

interface NotificationListProps {
  notifications: NotificationItem[];
  meta: NotificationMeta;
  isLoading: boolean;
  isError: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

const NotificationList = ({
  notifications,
  meta,
  isLoading,
  isError,
  page,
  onPageChange,
}: NotificationListProps) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ borderRadius: 3 }}>
        حدث خطأ أثناء جلب الإشعارات، حاول مرة أخرى لاحقاً.
      </Alert>
    );
  }

  if (!notifications.length) {
    return (
      <Box
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          py: 6,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
          لا توجد إشعارات حالياً
        </Typography>
        <Typography variant="body2" color="text.secondary">
          سيتم عرض أحدث الإشعارات هنا عند توفرها.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.notificationId}
          notification={notification}
        />
      ))}

      {meta.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
          <Pagination
            count={meta.totalPages}
            page={Math.max(page - 1, 0)}
            onChange={(_, nextPage) => onPageChange(nextPage + 1)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default NotificationList;
