import { axiosInstance } from "../config/axios";

const UserService = {
  getProfile: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axiosInstance.get("/user");
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default UserService;
