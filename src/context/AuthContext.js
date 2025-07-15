"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userKey, setUserKey] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para saber se a verificação inicial terminou
  const router = useRouter();

  useEffect(() => {
    // Este efeito roda apenas no cliente, após a montagem inicial.
    try {
      const storedKey = localStorage.getItem("clienteKey");
      if (storedKey) {
        setUserKey(storedKey);
      }
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  }, []);

  const login = (key) => {
    localStorage.setItem('clienteKey', key);
    setUserKey(key);
    router.push('/pagInfo'); // Exemplo: redirecionar para o perfil após o login
  };

  const logout = () => {
    localStorage.removeItem('clienteKey');
    setUserKey(null);
    router.push('/'); // Redireciona para a home ao fazer logout
  };

  const value = {
    userKey,
    isAuthenticated: !loading && !!userKey, // Só está autenticado se não estiver carregando E tiver a chave
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};