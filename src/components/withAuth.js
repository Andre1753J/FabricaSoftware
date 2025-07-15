"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

// Este é um High-Order Component (HOC) para proteger rotas
const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Se não estiver carregando e não estiver autenticado, redireciona
      if (!loading && !isAuthenticated) {
        router.replace('/login'); // Use replace para não adicionar a página ao histórico
      }
    }, [isAuthenticated, loading, router]);

    // Se estiver carregando, exibe uma mensagem ou um spinner
    if (loading) {
      return <div>Carregando...</div>; // TODO: Substituir por um componente de Spinner/Loading
    }

    // Se estiver autenticado, renderiza o componente da página que foi envolvido pelo HOC
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // Retorna null para evitar "piscar" a página antiga enquanto o redirecionamento acontece
    return null;
  };
  
  return Wrapper;
};

export default withAuth;