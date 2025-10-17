import React, { createContext, useContext, useState, useEffect } from 'react';

// Key names used for localStorage.
const LS_USERS = 'limpifresh-users';
const LS_CURRENT_USER = 'limpifresh-current-user';

// Create context for authentication.
const UserContext = createContext(null);

/**
 * UserProvider stores authenticated user information and exposes
 * functions for login, registration and logout. Users and current
 * user state are persisted to localStorage. Note that this is a
 * demonstration and does not implement security best practices.
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load current user from localStorage on mount.
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

  // Persist current user whenever it changes.
  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_CURRENT_USER);
    }
  }, [user]);

  // Helper to read list of registered users from storage.
  const getUsers = () => {
    try {
      const list = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (err) {
      console.error('Error reading users', err);
      return [];
    }
  };

  // Persist users list to storage.
  const setUsers = (users) => {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  };

  /**
   * Login with email and password. Returns a promise resolved
   * with the user if successful, or rejects with an error message.
   */
  const login = async (email, password) => {
    // Special case for admin credentials. The old site used a fixed admin login.
    // If admin logs in, we set an isAdmin flag and short-circuit user lookup.
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

  /**
   * Register a new user. If the email already exists, rejects with
   * an error. Otherwise stores the new user and logs them in.
   */
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

  /**
   * Logout the current user.
   */
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the user context.
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}