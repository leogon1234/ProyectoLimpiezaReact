import axios from "axios";

const api = axios.create({
  baseURL: "http://100.29.75.19:8080",
});

export default api;