import { axiosInstance } from "../config/axios";

export const getTickets = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("ticket/all");
    if (res.success === true) return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
