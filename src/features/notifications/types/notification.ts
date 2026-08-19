export interface NotificationItem {
  notificationId: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface NotificationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
