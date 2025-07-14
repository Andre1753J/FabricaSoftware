"use client";
import React, { useState, useEffect } from 'react';
import RotaSegura from '@/components/rotaSegura';
import styles from './meus-pedidos.module.css';
import { API_ROUTES } from '@/lib/api';
import Image from 'next/image';

export default function MeusPedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPedidos = async () => {
        const key = localStorage.getItem("clienteKey");
        if (!key) {
            setError("Você não está logado.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_ROUTES.minhasSolicitacoes(key));
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Falha ao buscar seus pedidos.");
            }
            const data = await response.json();
            setPedidos(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const handleCancelar = async (animalId) => {
        if (!window.confirm("Tem certeza que deseja cancelar esta solicitação?")) {
            return;
        }

        const key = localStorage.getItem("clienteKey");
        try {
            const response = await fetch(API_ROUTES.cancelarAdocao(key, animalId), {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Não foi possível cancelar a solicitação.");
            }
            alert("Solicitação cancelada com sucesso!");
            fetchPedidos(); // Atualiza a lista
        } catch (err) {
            alert(`Erro: ${err.message}`);
        }
    };

    if (loading) return <div className={styles.centeredMessage}>Carregando...</div>;
    if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;

    return (
        <RotaSegura>
            <main className={styles.main}>
                <h1 className={styles.titulo}>Meus Pedidos de Adoção</h1>
                {pedidos.length === 0 ? (
                    <p className={styles.centeredMessage}>Você ainda não fez nenhum pedido de adoção.</p>
                ) : (
                    <div className={styles.lista}>
                        {pedidos.map((pedido) => (
                            <div key={pedido.id_adocao} className={styles.card}>
                                <Image src={API_ROUTES.imagem(pedido.imagem_animal)} alt={pedido.nome_animal} width={80} height={80} className={styles.animalImage} />
                                <div className={styles.info}>
                                    <p><strong>Animal:</strong> {pedido.nome_animal}</p>
                                    <p><strong>Status:</strong> <span className={`${styles.status} ${styles[pedido.status]}`}>{pedido.status}</span></p>
                                </div>
                                {pedido.status === 'pendente' && (
                                    <button
                                        onClick={() => handleCancelar(pedido.id_animal)}
                                        className={styles.botaoCancelar}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </RotaSegura>
    );
}