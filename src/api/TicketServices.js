import axiosInstance from "../config/axios.ts";

const TicketService = {
  getAll: async (filters) => {
    try {
      const res = await axiosInstance.get("ticket/all", { params: filters });
      if (res && res.status === 200 && res.data.success === true) return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  create: async (inputs) => {
    if (!inputs) return Promise.reject("error");
    try {
      const res = await axiosInstance.post("/ticket", inputs);
      if (res && res.status === 201 && res.data.success === true) return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  get: async (id) => {
    if (!id) return Promise.reject("no id provided");
    try {
      const res = await axiosInstance.get("/ticket/edit/" + id);
      if (res && res.status === 200 && res.data.success === true) return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getRecentlyUpdated: async () => {
    try {
      const res = await axiosInstance.get("/ticket/recently/updated");
      if (res && res.data.success === true) return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  update: async (inputs, assignees) => {
    try {
      const res = await axiosInstance.post("/ticket/update", { ...inputs, assignees });
      if (res && res.status === 200 && res.data.success === true) return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  comment: async (ticketId, content) => {
    try {
      return await axiosInstance.post("/ticket/comment", { ticketId, content });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  editComment: async (ticketId, commentId, newContent) => {
    try {
      return await axiosInstance.post("/ticket/comment/update", { ticketId, commentId, newContent });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  reply: async (ticketId, commentId, reply) => {
    try {
      return await axiosInstance.post("/ticket/comment/reply", { ticketId, commentId, reply });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default TicketService;
