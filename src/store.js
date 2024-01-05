import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./component/auth/login/LoginSlice";
import UserReducer from "./pages/UserSlice";
const store = configureStore({
  reducer: {
    login: LoginReducer,
    user: UserReducer,
  },
});

export default store;
