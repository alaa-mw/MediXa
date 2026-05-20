export interface FetchResponse<T> {
  message: string;
  data: T;
}

export type QueryParamValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryParamValue>;
