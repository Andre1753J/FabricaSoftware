"use client";
import React, { useState, useEffect } from 'react';
import withAuth from '@/components/withAuth'; // Trocamos para o withAuth
import styles from './solicitacoes.module.css';
import { API_ROUTES } from '@/lib/api';
import { useAuth } from '@/context/AuthContext'; // Importamos o useAuth

function SolicitacoesPage() { // A página se torna um componente normal
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userKey } = useAuth(); // Pegamos a chave direto do contexto

    const fetchSolicitacoes = async () => {
        if (!userKey) {
            setError("Você não está logado.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_ROUTES.solicitacoesRecebidas(userKey));
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Falha ao buscar solicitações.");
            }
            const data = await response.json();
            setSolicitacoes(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userKey) fetchSolicitacoes(); // Só busca as solicitações se a chave já estiver disponível
    }, [userKey]); // Adicionamos userKey como dependência

    const handleResolver = async (id_adocao, status) => {
        try {
            const response = await fetch(API_ROUTES.resolverAdocao(userKey), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_adocao, status }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || `Não foi possível ${status === 'aprovado' ? 'aprovar' : 'recusar'} a adoção.`);
            }
            alert(`Solicitação ${status === 'aprovado' ? 'aprovada' : 'recusada'} com sucesso!`);
            // Atualiza a lista para refletir a mudança de status
            fetchSolicitacoes();
        } catch (err) {
            alert(`Erro: ${err.message}`);
        }
    };

    if (loading) return <div className={styles.centeredMessage}>Carregando...</div>;
    if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Solicitações de Adoção Recebidas</h1>
            {solicitacoes.length === 0 ? (
                <p className={styles.centeredMessage}>Você não tem nenhuma solicitação de adoção pendente.</p>
            ) : (
                <div className={styles.lista}>
                    {solicitacoes.map((solicitacao) => (
                        <div key={solicitacao.id_adocao} className={styles.card}>
                            <div className={styles.info}>
                                <p><strong>Animal:</strong> {solicitacao.nome_animal}</p>
                                <p><strong>Solicitante:</strong> {solicitacao.nome_solicitante}</p>
                                <p><strong>Email:</strong> {solicitacao.email_solicitante}</p>
                                <p><strong>Status:</strong> <span className={`${styles.status} ${styles[solicitacao.status]}`}>{solicitacao.status}</span></p>
                            </div>
                            {solicitacao.status === 'pendente' && (
                                <div className={styles.botoes}>
                                    <button
                                        onClick={() => handleResolver(solicitacao.id_adocao, 'aprovado')}
                                        className={`${styles.botao} ${styles.aprovar}`}
                                    >
                                        Aprovar
                                    </button>
                                    <button
                                        onClick={() => handleResolver(solicitacao.id_adocao, 'recusado')}
                                        className={`${styles.botao} ${styles.recusar}`}
                                    >
                                        Recusar
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

export default withAuth(SolicitacoesPage); // Envolvemos o componente com o HOC na exportação
