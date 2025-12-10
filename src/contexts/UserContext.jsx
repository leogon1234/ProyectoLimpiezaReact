import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api.js";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperamos el usuario de la sesión anterior si existe
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Error leyendo usuario guardado", e);
      }
    }
  }, []);

  // ---------- LOGIN ----------
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      
      // --- CAMBIO CLAVE: RECIBIR TOKEN Y ESTADO DE ADMIN ---
      // Ahora el backend responde: { "token": "...", "admin": true/false }
      const { token, admin } = res.data; 
      
      // Guardamos el token para las peticiones
      localStorage.setItem("token", token);

      // Creamos el objeto usuario con el dato REAL de si es admin
      const mappedUser = {
        email: email,
        isAdmin: admin, // <--- AQUI ASIGNAMOS EL VALOR QUE VIENE DE LA BASE DE DATOS
      };

      setUser(mappedUser);
      
      // Guardamos el usuario (con su permiso de admin) en el navegador
      // para que no se pierda al recargar la página
      localStorage.setItem("user", JSON.stringify(mappedUser));
      
      return mappedUser;

    } catch (error) {
      console.error("Error en login", error);
      const msg =
        error.response?.data ||
        "No se pudo iniciar sesión. Verifica tu correo y contraseña.";
      throw new Error(typeof msg === "string" ? msg : "Error en login");
    }
  };

  // ---------- REGISTRO ----------
  const register = async (name, email, password, rut, region, comuna) => {
    try {
      await api.post("/api/auth/registro", {
        nombre: name,
        email,
        password,
        rut,
        region,
        comuna,
      });
      return true;
    } catch (error) {
      console.error("Error en registro", error);
      const msg =
        error.response?.data ||
        "No se pudo registrar el usuario. Inténtalo nuevamente.";
      throw new Error(typeof msg === "string" ? msg : "Error en registro");
    }
  };

  // ---------- CERRAR SESION ----------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}