import axios from "axios";

const api = axios.create({
  baseURL: "http://13.218.237.87:8080",
});

export default api;