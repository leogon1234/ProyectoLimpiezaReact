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
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });

    const token = res.data?.token;
    if (token) localStorage.setItem("token", token);

    const isAdmin = Boolean(res.data?.isAdmin ?? res.data?.admin);

    const mappedUser = {
      id: res.data?.userId ?? res.data?.usuarioId ?? res.data?.id ?? null,
      name: res.data?.nombre ?? res.data?.name ?? email,
      email,
      isAdmin,
      rol: isAdmin ? "ADMIN" : "CLIENTE",
    };

    setUser(mappedUser);
    localStorage.setItem("user", JSON.stringify(mappedUser));

    return mappedUser;
  };

  const register = async (name, email, password, rut, region, comuna) => {
    await api.post("/api/auth/registro", {
      nombre: name,
      email,
      password,
      rut,
      region,
      comuna,
    });
    return true;
  };

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
