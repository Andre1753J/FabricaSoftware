"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RotaSegura from '@/components/rotaSegura';
import styles from './adocao.module.css';
// import Image from 'next/image'; // Temporariamente desabilitado para teste
import { API_ROUTES } from '@/lib/api';

function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "Idade não informada";
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();
    let idadeMeses = hoje.getMonth() - nascimento.getMonth();
    if (idadeMeses < 0 || (idadeMeses === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeAnos--;
        idadeMeses += 12;
    }
    if (idadeAnos > 0) {
        return `${idadeAnos} ano(s)`;
    }
    return `${idadeMeses} mes(es)`;
}

export default function ConfirmarAdocaoPage() {
    const router = useRouter();
    const params = useParams();
    const animalId = params?.id;
    
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!animalId) {
            setError("ID do animal não fornecido.");
            setLoading(false);
            return;
        }

        const fetchAnimalData = async () => {
            try {
                const response = await fetch(API_ROUTES.detalharAnimal(animalId));
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Falha ao buscar dados do animal.");
                }
                const data = await response.json();
                setAnimal(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalData();
    }, [animalId]);

    const handleConfirm = async () => {
        const key = localStorage.getItem("clienteKey");
        if (!key) {
            alert("Você precisa estar logado para solicitar uma adoção.");
            return;
        }
        if (!animal) {
            alert("Erro: Dados do animal ainda não foram carregados. Tente novamente em um instante.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(API_ROUTES.solicitarAdocao(key), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_animal: animal.id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Não foi possível solicitar a adoção.");
            }
            alert("Solicitação de adoção enviada com sucesso! O doador entrará em contato.");
            router.push('/adocao');
        } catch (err) {
            alert(`Erro: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (loading) return <div className={styles.centeredMessage}>Carregando informações do pet...</div>;
    if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;
    if (!animal) return <div className={styles.centeredMessage}>Animal não encontrado.</div>;

    return (
        <RotaSegura>
            <main className={styles.main}>
            <div className={styles.info}>
                <h1>Confirmar Solicitação de Adoção</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.gato}>
                    {/* Usando a tag <img> para teste de diagnóstico. */}
                    <img
                        src={animal.imagens && animal.imagens.length > 0 ? API_ROUTES.imagem(animal.imagens[0]) : "/images/brawlGato.png"}
                        alt={`Foto de ${animal.nome}`}
                        width="400"
                        height="400"
                        className={styles.cat}
                    />
                </div>

                <div className={styles.info_gerais}>
                    <p className={styles.palavra}><strong>Nome:</strong> {animal.nome}</p>
                    <p className={styles.palavra}><strong>Raça:</strong> {animal.raca}</p>
                    <p className={styles.palavra}><strong>Idade:</strong> {calcularIdade(animal.dt_nascimento)}</p>
                    <p className={styles.palavra}><strong>Gênero:</strong> {animal.sexo === 'M' ? 'Macho' : 'Fêmea'}</p>
                    <p className={styles.palavra}><strong>Porte:</strong> {animal.porte}</p>
                    <p className={styles.donorInfo}>Anunciado por: {animal.nome_doador || 'Não informado'}</p>
                </div>
            </div>

            <div className={styles.info_gato}>
                <h3>Sobre o Pet</h3>
                <p>{animal.descricao || "Nenhuma descrição fornecida."}</p>
            </div>

            <div className={styles.healthInfo}>
                <h3>Saúde</h3>
                <div className={styles.healthItems}>
                    <span>{animal.castrado ? '✅' : '❌'} Castrado</span>
                    <span>{animal.vacinado ? '✅' : '❌'} Vacinado</span>
                    <span>{animal.vermifugado ? '✅' : '❌'} Vermifugado</span>
                </div>
            </div>

            <div className={styles.botaos}>
                <button className={styles.bot_1} onClick={handleConfirm} disabled={isSubmitting} aria-label="Confirmar Adoção">
                    {isSubmitting ? 'Enviando...' : 'Confirmar Adoção'}
                </button>
                <button className={styles.bot_2} onClick={handleCancel} aria-label="Cancelar Adoção">
                    Voltar
                </button>
            </div>
            </main>
        </RotaSegura>
    );
}
