"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_ROUTES } from '@/lib/api';
import styles from './Adocao.module.css';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdocaoPage() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const response = await fetch(API_ROUTES.listarAnimaisDisponiveis);
        if (!response.ok) {
          throw new Error('Não foi possível carregar os animais.');
        }
        const data = await response.json();
        setAnimais(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimais();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className={styles.centeredMessage}>Erro: {error}</div>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Encontre seu Novo Amigo</h1>
      <p className={styles.subtitulo}>Veja os animais que estão esperando por um lar.</p>
      
      {animais.length === 0 ? (
        <div className={styles.centeredMessage}>Nenhum animal disponível para adoção no momento.</div>
      ) : (
        <div className={styles.grid}>
          {animais.map((animal) => (
            <Link href={`/animal/${animal.id_animal}`} key={animal.id_animal} className={styles.card}>
                <img src={`http://localhost:3001/uploads/${animal.imagem_animal}`} alt={`Foto de ${animal.nome}`} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{animal.nome}</h2>
                  <p className={styles.cardInfo}>{animal.especie} - {animal.sexo}</p>
                </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}