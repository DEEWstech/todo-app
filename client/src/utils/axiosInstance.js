import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
//   baseURL: "https://task-duty-server-sebm.onrender.com",
});

export default axiosInstance;