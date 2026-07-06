export interface PaginatedResponse<T> {
  data: T[];

  page: number;

  limit: number;

  total: number;

  pages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}