"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/components/withAuth';
import { API_ROUTES } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './GerenciarAnimais.module.css';

function GerenciarAnimaisPage() {
  const { userKey } = useAuth();
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animalParaExcluir, setAnimalParaExcluir] = useState(null);

  const fetchMeusAnimais = async () => {
    if (!userKey) return;
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.meusAnimais(userKey));
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao buscar seus animais.');
      }
      setAnimais(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeusAnimais();
  }, [userKey]);

  const handleAbrirModal = (animal) => {
    setAnimalParaExcluir(animal);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
    setAnimalParaExcluir(null);
  };

  const handleConfirmarExclusao = async () => {
    if (!animalParaExcluir) return;

    try {
      const response = await fetch(API_ROUTES.deletarAnimal(animalParaExcluir.id_animal, userKey), {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível excluir o animal.');
      }
      alert('Animal excluído com sucesso!');
      handleFecharModal();
      fetchMeusAnimais();
    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.titulo}>Gerenciar Meus Animais</h1>
        {animais.length === 0 ? (
          <p className={styles.centeredMessage}>Você ainda não cadastrou nenhum animal.</p>
        ) : (
          <div className={styles.lista}>
            {animais.map((animal) => (
              <div key={animal.id_animal} className={styles.card}>
                <img src={`http://localhost:3001/uploads/${animal.imagem_animal}`} alt={animal.nome} className={styles.imagem} />
                <div className={styles.info}>
                  <h2>{animal.nome}</h2>
                  <p>{animal.especie} - {animal.raca}</p>
                  <p>Status: <span className={styles[animal.status]}>{animal.status}</span></p>
                </div>
                <div className={styles.acoes}>
                  <button onClick={() => handleAbrirModal(animal)} className={styles.botaoExcluir}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Confirmar Exclusão</h2>
            <p>Você tem certeza que deseja excluir <strong>{animalParaExcluir?.nome}</strong>? Esta ação não pode ser desfeita.</p>
            <div className={styles.modalActions}>
              <button onClick={handleFecharModal} className={styles.botaoCancelar}>Cancelar</button>
              <button onClick={handleConfirmarExclusao} className={styles.botaoConfirmar}>Sim, Excluir</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(GerenciarAnimaisPage);
