import axiosInstance from "../config/axios";

const TicketService = {
  getAll: async (filters) => {
    try {
      const res = await axiosInstance.get("ticket/all", { params: filters });
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

  getTicket: async (id) => {
    if (!id) return Promise.reject("no id provided");
    try {
      const res = await axiosInstance.get("/ticket/edit/" + id);
      if (res && res.status === 200 && res.data.success === true) return res.data;
    } catch (error) {
      return error;
    }
  },

  updateTicket: async (inputs) => {
    try {
      const res = await axiosInstance.post("/ticket/update", inputs);
      if (res && res.status === 200 && res.data.success === true) return res.data;
    } catch (error) {
      return error;
    }
  },
};

export default TicketService;
