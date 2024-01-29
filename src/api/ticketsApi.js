import { axiosInstance } from "../config/axios";

export const getTickets = () => async (dispatch) => {
  try {
    await axiosInstance
      .get("ticket/all")
      .then((res) => {
        if (res.success === true) return res;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  } catch (error) {
    return Promise.reject(error.message);
  }
};
