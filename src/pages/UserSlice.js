import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: [],
    error: "",
  },
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    userLoadingSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    userLoadingFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { userLoading, userLoadingSuccess, userLoadingFail } = UserSlice.actions;

export default UserSlice.reducer;
