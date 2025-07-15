"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/components/withAuth';
import { API_ROUTES } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './MeusPedidos.module.css';
import Link from 'next/link';

function MeusPedidosPage() {
  const { userKey } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeusPedidos = async () => {
    if (!userKey) return;
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.minhasAdocoes(userKey));
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao buscar seus pedidos de adoção.');
      }
      setPedidos(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeusPedidos();
  }, [userKey]);

  const handleCancelarPedido = async (idAdocao) => {
    if (!confirm('Tem certeza que deseja cancelar este pedido de adoção?')) {
      return;
    }

    try {
      const response = await fetch(API_ROUTES.cancelarAdocao(idAdocao, userKey), {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível cancelar o pedido.');
      }
      alert('Pedido de adoção cancelado com sucesso!');
      // Atualiza a lista para refletir a mudança
      fetchMeusPedidos();
    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Meus Pedidos de Adoção</h1>
      {pedidos.length === 0 ? (
        <p className={styles.centeredMessage}>Você ainda não fez nenhum pedido de adoção.</p>
      ) : (
        <div className={styles.lista}>
          {pedidos.map((pedido) => (
            <div key={pedido.id_adocao} className={styles.card}>
              <div className={styles.info}>
                <p><strong>Animal:</strong> <Link href={`/animal/${pedido.id_animal}`}>{pedido.nome_animal}</Link></p>
                <p><strong>Dono do animal:</strong> {pedido.nome_dono}</p>
                <p><strong>Data do Pedido:</strong> {new Date(pedido.data_adocao).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`${styles.status} ${styles[pedido.status]}`}>{pedido.status}</span></p>
              </div>
              {pedido.status === 'pendente' && (
                <div className={styles.acoes}>
                  <button 
                    onClick={() => handleCancelarPedido(pedido.id_adocao)}
                    className={styles.botaoCancelar}
                  >
                    Cancelar Pedido
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default withAuth(MeusPedidosPage);