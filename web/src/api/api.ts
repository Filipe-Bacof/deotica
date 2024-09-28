import Axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const Api: AxiosInstance = Axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

Api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("@deoticaToken")}`;

    return Promise.resolve(config);
  },
  (err) => {
    return Promise.reject(err);
  },
);
