import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const vendorLogin = (data) => api.post("auth/vendor/login", data);



export default api;
