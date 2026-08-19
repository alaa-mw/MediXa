import { useGetWithParams } from "../../../shared/hooks/useGetWithParams";
import type { NotificationItem } from "../types/notification";

export const useNotifications = (page = 1, limit = 20) => {
  return useGetWithParams<NotificationItem[]>("/notifications", {
    page,
    limit,
  });
};
