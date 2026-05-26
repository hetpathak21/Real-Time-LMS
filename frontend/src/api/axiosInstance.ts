import axios from "axios";
import { refreshTokenApi } from "../api/authApi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Request interceptor (attach token)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor (global error handling)

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const requestUrl = String(error.config?.url || "");
//     const token = localStorage.getItem("token");
//     const isAuthBootstrapRequest = requestUrl.includes("/auth/me");
//     const isLoginRequest =
//       requestUrl.includes("/auth/login") ||
//       requestUrl.includes("/auth/signup");

//     if (status === 401 && token && !isLoginRequest) {
//       localStorage.removeItem("token");

//       if (!isAuthBootstrapRequest) {
//         showToast("Session expired. Please login again.", "warning");
//       }

//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const requestUrl = String(originalRequest?.url || "");
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh-token");
    const isRefreshRequest = requestUrl.includes("/auth/refresh-token");
    const isLoginRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/signup");

    if (
      status === 401 &&
      accessToken &&
      refreshToken &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      !isLoginRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshTokenApi(refreshToken);
        const newToken = data.accessToken;

        localStorage.setItem("token", newToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");

        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 401 && !isLoginRequest && !isRefreshRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
