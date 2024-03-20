import axiosInstance from "../config/axios";

const TicketService = {
  getAll: async () => {
    try {
      const res = await axiosInstance.get("ticket/all");
      if (res.success === true) return res;
    } catch (error) {
      return error;
    }
  },
};

export default TicketService;
