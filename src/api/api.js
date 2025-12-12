import axios from "axios";

const api = axios.create({
  baseURL: "http://18.232.249.229:8080",
});

export default api;