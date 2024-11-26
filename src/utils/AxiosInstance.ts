import axios, { AxiosInstance} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

// Interceptor for requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
