import axios from "axios";
import AuthService from "../api/AuthService";

const accessToken = AuthService.getAccessToken();
const refreshToken = AuthService.getRefreshToken();

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/v1/",
  headers: {
    Authorization: accessToken,
  },
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

    if (error.response.data.status === 403 && error.response.data.message === "Access Forbidden") {
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

          originalRequest.headers.Authorization = newAccessToken;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("No Refresh token", refreshError);
          // return Navigate({ to: "/login" });
        }
      } else {
        console.error("refere token expired");
        // return Navigate({ to: "/login" });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
