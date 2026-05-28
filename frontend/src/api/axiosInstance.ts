import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { refreshTokenApi } from "../api/authApi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",

  withCredentials: true,
});

/* ---------------- CUSTOM TYPES ---------------- */

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError) => void;
}

/* ---------------- REQUEST INTERCEPTOR ---------------- */

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ---------------- TOKEN REFRESH LOGIC ---------------- */

let isRefreshing = false;

let failedQueue: FailedQueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    const status = error.response?.status;

    const requestUrl = String(originalRequest?.url || "");

    const accessToken = localStorage.getItem("token");

    const refreshToken = localStorage.getItem("refresh-token");

    const isRefreshRequest = requestUrl.includes("/auth/refresh-token");

    const isLoginRequest =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/signup");

    if (
      status === 401 &&
      accessToken &&
      refreshToken &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      !isLoginRequest
    ) {
      /* ---------- IF TOKEN ALREADY REFRESHING ---------- */

      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then((newToken) => {
          if (newToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {
        const data = await refreshTokenApi(refreshToken);

        const newToken = data.accessToken;

        localStorage.setItem("token", newToken);

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        localStorage.removeItem("token");

        localStorage.removeItem("refresh-token");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    /* ---------- FORCE LOGOUT ON INVALID TOKEN ---------- */

    if (status === 401 && !isLoginRequest && !isRefreshRequest) {
      localStorage.removeItem("token");

      localStorage.removeItem("refresh-token");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
