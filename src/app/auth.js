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
  const [redirectUrl, setRedirectUrl] = useState('/'); 

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

  const login = (key, redirect = redirectUrl) => {
    localStorage.setItem('clienteKey', key);
    setUserKey(key);
    router.push(redirect);
  };

  const logout = () => {
    localStorage.removeItem('clienteKey');
    setRedirectUrl('/'); 
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

export const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        const currentUrl = router.asPath;
        // Armazena a URL atual antes de redirecionar para login
        setRedirectUrl(currentUrl);
        router.push('/telaLogin');
      }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
      // Pode retornar um componente de carregamento ou uma mensagem
      return <p>Carregando...</p>; 
    }

    // Se autenticado, renderiza o componente com as props
    return <Component {...props} />;
  };
};