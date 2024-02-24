import { getTickets } from "../api/ticketsApi";
import { ticketLoading, ticketLoadingFail, ticketLoadingSuccess } from "./TicketSlice";

export const tickets = () => async (dispatch) => {
  try {
    dispatch(ticketLoading());
    //api call
    const res = getTickets();
    dispatch(ticketLoadingSuccess(res));
  } catch (error) {
    dispatch(ticketLoadingFail(error));
  }
};
