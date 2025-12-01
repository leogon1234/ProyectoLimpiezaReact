import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api.js";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
      const backendUser = res.data;

      const mappedUser = {
        id: backendUser.id,
        nombre: backendUser.nombre,
        email: backendUser.email,
        rut: backendUser.rut,
        region: backendUser.region,
        comuna: backendUser.comuna,
        rol: backendUser.rol?.nombreRol,
        isAdmin: backendUser.rol?.nombreRol === "ADMIN",
      };

      setUser(mappedUser);
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