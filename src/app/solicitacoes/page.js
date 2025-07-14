"use client";
import React, { useState, useEffect } from 'react';
import RotaSegura from '@/components/rotaSegura';
import styles from './solicitacoes.module.css';
import { API_ROUTES } from '@/lib/api';

export default function SolicitacoesPage() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSolicitacoes = async () => {
        const key = localStorage.getItem("clienteKey");
        if (!key) {
            setError("Você não está logado.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_ROUTES.solicitacoesRecebidas(key));
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
        fetchSolicitacoes();
    }, []);

    const handleResolver = async (id_adocao, status) => {
        const key = localStorage.getItem("clienteKey");
        try {
            const response = await fetch(API_ROUTES.resolverAdocao(key), {
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
        <RotaSegura>
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
        </RotaSegura>
    );
}