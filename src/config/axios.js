import axios from "axios";

const accessToken = sessionStorage.getItem("accessToken");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/v1/",
  headers: {
    Authorization: accessToken,
  },
});
