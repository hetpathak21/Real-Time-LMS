import axios from "axios";
import { showToast } from "../utils/toast";

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
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = String(error.config?.url || "");
    const token = localStorage.getItem("token");
    const isAuthBootstrapRequest = requestUrl.includes("/auth/me");
    const isLoginRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/signup");

    if (status === 401 && token && !isLoginRequest) {
      localStorage.removeItem("token");

      if (!isAuthBootstrapRequest) {
        showToast("Session expired. Please login again.", "warning");
      }

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
