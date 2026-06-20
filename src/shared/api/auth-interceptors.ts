import { AxiosError } from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import TokenService from "../services/tokenService";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const MAX_REFRESH_RETRIES = 1;
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (
  http: AxiosInstance,
): Promise<string | null> => {
  const refreshToken = TokenService.getRefreshToken();
  if (!refreshToken) {
    TokenService.clearTokens();
    return null;
  }

  const response = await http.post<RefreshTokenResponse>(
    "/authentication/refresh-token",
    { refreshToken },
  );

  const nextAccessToken = response.data.data.accessToken;
  const nextRefreshToken = response.data.data.refreshToken;

  TokenService.setTokens({
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
  });

  return nextAccessToken;
};

const getRefreshedAccessToken = async (
  http: AxiosInstance,
): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(http).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const setupAuthInterceptors = (http: AxiosInstance): void => {
  http.interceptors.request.use((config) => {
    const token = TokenService.getAccessToken();
    config.headers = (config.headers ?? {}) as AxiosRequestHeaders;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = "true";
    }

    return config;
  });

  http.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const isRefreshEndpoint = originalRequest?.url?.includes(
        "/authentication/refresh-token",
      );

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !isRefreshEndpoint
      ) {
        originalRequest._retryCount = originalRequest._retryCount ?? 0;

        if (originalRequest._retryCount >= MAX_REFRESH_RETRIES) {
          return Promise.reject(error);
        }

        originalRequest._retryCount += 1;

        try {
          const accessToken = await getRefreshedAccessToken(http);

          if (!accessToken) {
            TokenService.clearTokens();
            return Promise.reject(error);
          }

          originalRequest.headers = (originalRequest.headers ??
            {}) as AxiosRequestHeaders;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return http(originalRequest);
        } catch (refreshError) {
          TokenService.clearTokens();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
