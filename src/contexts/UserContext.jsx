import React, { createContext, useContext, useState, useEffect } from 'react';

const LS_USERS = 'limpifresh-users';
const LS_CURRENT_USER = 'limpifresh-current-user';

export const UserContext = createContext(null);


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(LS_CURRENT_USER);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing stored user', err);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_CURRENT_USER);
    }
  }, [user]);

  const getUsers = () => {
    try {
      const list = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (err) {
      console.error('Error reading users', err);
      return [];
    }
  };

  const setUsers = (users) => {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  };


  const login = async (email, password) => {

    if ((email === 'admin' || email === 'admin@admin.com') && password === 'admin') {
      const adminUser = { name: 'Administrador', email: 'admin@admin.com', isAdmin: true };
      setUser(adminUser);
      return adminUser;
    }
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ email: found.email, name: found.name, isAdmin: false });
      return found;
    }
    throw new Error('Credenciales inválidas.');
  };


  const register = async (name, email, password) => {
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error('El correo ya está registrado.');
    }
    // Prevent users from registering as admin
    const newUser = { name, email, password };
    const updated = [...users, newUser];
    setUsers(updated);
    setUser({ name, email, isAdmin: false });
    return newUser;
  };


  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}