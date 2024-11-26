import axios, { AxiosInstance} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://library-management-gray-nu.vercel.app/",
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
