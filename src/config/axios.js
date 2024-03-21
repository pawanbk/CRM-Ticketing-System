import axios from "axios";
import AuthService from "../api/AuthService";
import { Navigate } from "react-router-dom";

const accessToken = AuthService.getAccessToken();
const refreshToken = AuthService.getRefreshToken();

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/v1/",
});

axiosInstance.interceptors.request.use(
  function (config) {
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

    // Check if the error is due to an expired access token
    if (error.response.data.status === 403 && error.response.data.message === "Access Forbidden") {
      // Send a request to refresh the access token
      if (refreshToken) {
        try {
          const url = "http://localhost:3001/v1/token";
          const response = await axios.get(url, {
            headers: {
              Authorization: refreshToken,
            },
          });
          const newAccessToken = await response.data.accessToken;
          sessionStorage.setItem("accessToken", newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = newAccessToken;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("No Refresh token", refreshError);
          // return Navigate({ to: "/login" });
        }
      } else {
        console.error("refere=sh token expired");
        // return Navigate({ to: "/login" });
      }
    }

    // For other errors, reject the promise
    return Promise.reject(error);
  }
);

const removeTokens = () => {
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
};

export default axiosInstance;
