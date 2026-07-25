import { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import baseAxios from "./http-instance";
import type { FetchResponse, QueryParams } from "./api-types";

class APIClient<T> {
  readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private buildUrl = (queryParams?: QueryParams) => {
    if (!queryParams || Object.keys(queryParams).length === 0)
      return this.endpoint;
    const params = new URLSearchParams();

    for (const key in queryParams) {
      const val = queryParams[key];
      if (val !== undefined && val !== null) params.append(key, String(val));
    }

    const qs = params.toString();
    return qs ? `${this.endpoint}?${qs}` : this.endpoint;
  };

  private request = <TData>(config: AxiosRequestConfig) => {
    return baseAxios
      .request<FetchResponse<TData>>(config)
      .then((res) => res.data) // not res
      .catch((error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
      });
  };

  get = (queryParams: QueryParams = {}) =>
    this.request<T>({
      method: "GET",
      url: this.buildUrl(queryParams),
    });

  getById = (id: string, queryParams: QueryParams = {}) =>
    this.request<T>({
      method: "GET",
      url: `${this.buildUrl(queryParams)}/${id}`,
    });

  post = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      data,
      headers: { "Content-Type": "application/json" },
    });

  postWithParams = (data?: unknown, queryParams?: QueryParams) =>
    this.request<T>({
      method: "POST",
      url: this.buildUrl(queryParams),
      data,
      headers: { "Content-Type": "application/json" },
    });

  postNoToken = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      data,
      headers: { Authorization: undefined },
    });

  postBolob = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      responseType: "blob",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });

  deleteById = (id: string) =>
    this.request<T>({ method: "DELETE", url: `${this.endpoint}/${id}` });

  deleteWithBody = (data?: unknown) =>
    this.request<T>({ method: "DELETE", url: `${this.endpoint}`, data });

  patch = (data?: unknown) =>
    this.request<T>({
      method: "PATCH",
      url: this.endpoint,
      data,
      headers: { "Content-Type": "application/json" },
    });
}

export default APIClient;
