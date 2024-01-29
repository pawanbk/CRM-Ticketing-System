import { createSlice } from "@reduxjs/toolkit";

const TicketSlice = createSlice({
  name: "tickets",
  initialState: {
    isLoading: false,
    tickets: [],
    error: "",
  },
  reducers: {
    ticketLoading: (state) => {
      state.isLoading = true;
    },
    ticketLoadingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.tickets = payload;
      state.error = "";
    },
    ticketLoadingFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { ticketLoading, ticketLoadingSuccess, ticketLoadingFail } = TicketSlice.actions;

export default TicketSlice.reducer;
