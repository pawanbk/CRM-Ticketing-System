import { userLoading, userLoadingSuccess, userLoadingFail } from "./UserSlice";
import UserService from "../api/UserService";

export const userInfo = () => async (dispatch) => {
  try {
    dispatch(userLoading());
    const res = await UserService.getProfile();
    if (res.data.success === true) dispatch(userLoadingSuccess(res.data.user));
  } catch (error) {
    dispatch(userLoadingFail(error.message));
  }
};
