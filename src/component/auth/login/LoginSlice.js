import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    error: "",
  },
  reducers: {
    loginLoading: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = LoginSlice;
export const { loginLoading, loginSuccess, loginFail } = actions;

export default reducer;
