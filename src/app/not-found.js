"use client"; // ESSA É A DIRETIVA MAIS IMPORTANTE DE TODAS.
// Ela informa ao Next.js que este componente usa hooks de cliente (useState, useEffect)
// e, portanto, deve ser renderizado no navegador, não no servidor.
// Sem isso, o AuthProvider falha no build, e nenhum componente filho encontrará o contexto.

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userKey, setUserKey] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para saber se a verificação inicial terminou
  const router = useRouter();

  useEffect(() => {
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
    router.push('/perfil');
  };

  const logout = () => {
    localStorage.removeItem('clienteKey');
    setUserKey(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ userKey, isAuthenticated: !loading && !!userKey, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};