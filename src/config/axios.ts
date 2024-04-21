import axios from "axios";
import AuthService from "../api/AuthService.js";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store.tsx";

const { logout } = useAuthStore.getState();
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/v1/",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = AuthService.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.data.status === 403 && error.response.data.message === "Access Forbidden") {
      const refreshToken = AuthService.getRefreshToken();
      if (refreshToken && refreshToken.length > 0) {
        try {
          const url = "http://localhost:3001/v1/token";
          const response = await axios.get(url, {
            headers: {
              Authorization: refreshToken,
            },
          });
          const newAccessToken = await response.data.accessToken;
          sessionStorage.setItem("accessToken", newAccessToken);

          originalRequest.headers.Authorization = newAccessToken;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired");
          logout();
          localStorage.removeItem("refreshToken");
          sessionStorage.removeItem("accessToken");
          return Navigate({ to: "/login" });
        }
      } else {
        console.error("No refresh token provided");
        logout();
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        return Navigate({ to: "/login" });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
