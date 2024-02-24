import axios from "axios";

const API_URL = "http://localhost:3001/v1/user/";

export const userLogin = (inputs) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(API_URL + "login", inputs);
      if (res.data.status === "success" && res.data.message === "Login successful") {
        sessionStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }
      return resolve(res.data);
    } catch (error) {
      return reject(error.response);
    }
  });
};

export const getUserProfile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) reject("Token not found!");
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: accessToken,
        },
      });
      return resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const userRegistration = async (payloads) => {
  if (!payloads.surName && !payloads.firstName && !payloads.email && !payloads.password && !payloads.confirmPassword) return Promise.reject("All fields are mandatory");
  if (payloads.password !== payloads.confirmPassword) return Promise.reject("Password does not matches");
  try {
    const res = await axios.post(API_URL, payloads);
    console.log(res);
    if (res.status === 201 && res.data.success === true) return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
