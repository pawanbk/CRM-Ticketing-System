import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./component/auth/login/LoginSlice";
import UserReducer from "./pages/UserSlice";
import TicketReducer from "./pages/TicketSlice";
const store = configureStore({
  reducer: {
    login: LoginReducer,
    user: UserReducer,
    ticket: TicketReducer,
  },
});

export default store;
