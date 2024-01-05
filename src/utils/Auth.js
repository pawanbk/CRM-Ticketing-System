export const auth = () => {
  if (sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken") != null) {
    return true;
  }
  return false;
};
