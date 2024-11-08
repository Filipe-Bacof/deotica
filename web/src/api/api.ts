import Axios, { type AxiosInstance } from "axios";
import { getToken } from "../utils/tokenMiddleware";

export const Api: AxiosInstance = Axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

Api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    config.headers["Content-Type"] = "application/json";

    return Promise.resolve(config);
  },
  (err) => {
    return Promise.reject(err);
  },
);
