export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FetchResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string;
  timestamp?: string;
  path?: string;
  meta:Meta;
}

export type QueryParamValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryParamValue>;

