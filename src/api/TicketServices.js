import axiosInstance from "../config/axios";

const TicketService = {
  getAll: async () => {
    try {
      const res = await axiosInstance.get("ticket/all");
      if (res && res.status === 200 && res.data.success === true) return res.data;
    } catch (error) {
      return error;
    }
  },

  createTicket: async (inputs) => {
    if (!inputs) return Promise.reject("error");
    try {
      const res = await axiosInstance.post("/ticket", inputs);
      if (res && res.status === 201 && res.data.success === true) return res.data;
    } catch (error) {
      return error;
    }
  },
};

export default TicketService;
