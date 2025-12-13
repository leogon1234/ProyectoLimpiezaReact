import axios from "axios";

const api = axios.create({
  baseURL: "http://18.232.249.229:8080",
});

//  Interceptor para enviar el Token en cada petición ---
api.interceptors.request.use(
  (config) => {
    // 1. Buscamos el token en el almacenamiento local
    const token = localStorage.getItem('token');
    
    // 2. Si existe, lo pegamos en la cabecera Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;