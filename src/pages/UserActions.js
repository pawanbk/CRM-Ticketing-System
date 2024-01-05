import { userLoading, userLoadingSuccess, userLoadingFail } from "./UserSlice";
import { getUserProfile } from "../api/userApi";

export const userInfo = () => async (dispatch) => {
  try {
    dispatch(userLoading());
    //api call
    const res = await getUserProfile();
    if (res.data.success === true) dispatch(userLoadingSuccess(res.data.user));
  } catch (error) {
    dispatch(userLoadingFail(error.message));
  }
};
