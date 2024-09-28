import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "/user/";

const AuthService = {
  login: (inputs) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(API_URL + "login", inputs);
        if (res.data.status === "success" && res.data.message === "Login successful") {
          sessionStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        resolve(res.data);
      } catch (error) {
        console.error(error);
        reject(error.response);
      }
    });
  },

  register: async (payloads) => {
    if (!payloads.surName && !payloads.firstName && !payloads.email && !payloads.password && !payloads.confirmPassword) return Promise.reject("All fields are mandatory");
    if (payloads.password !== payloads.confirmPassword) return Promise.reject("Password does not matches");
    try {
      const res = await axios.post(API_URL, payloads);
      console.log(res);
      if (res.status === 201 && res.data.success === true) return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAccessToken: () => sessionStorage.getItem("accessToken"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
};

export default AuthService;
