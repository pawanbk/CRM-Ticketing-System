import axios from "axios";
export const getFreshAccessToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        reject("Token not found!");
      }
      const res = await axios.get("http://localhost:3001/v1/token/", {
        headers: {
          Authorization: refreshToken,
        },
      });
      if (res.data.success === true) {
        sessionStorage.setItem("accessToken", res.data.accessToken);
      }
      resolve(true);
    } catch (error) {
      if (error.message === "Request failed with status code 403") {
        localStorage.removeItem("refreshToken");
        reject(false);
      }
    }
  });
};
