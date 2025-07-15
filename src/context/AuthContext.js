"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userKey, setUserKey] = useState(undefined); // Inicia como undefined para sabermos que está carregando
  const router = useRouter();

  useEffect(() => {
    const storedKey = localStorage.getItem("clienteKey");
    setUserKey(storedKey);
  }, []);

  const login = (key) => {
    localStorage.setItem('clienteKey', key);
    setUserKey(key);
  };

  const logout = () => {
    localStorage.removeItem('clienteKey');
    setUserKey(null);
    router.push('/'); // Redireciona para a home ao fazer logout
  };

  const value = { userKey, isLoggedIn: !!userKey, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);