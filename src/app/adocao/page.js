"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_ROUTES } from '@/lib/api'; // Usando o alias para um caminho mais robusto
import styles from './Adocao.module.css';
import LoadingSpinner from '@/components/LoadingSpinner'; // Usando o alias para um caminho mais robusto

export default function AdocaoPage() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Futuramente, você pode adicionar o estado para os filtros aqui
  // const [filtros, setFiltros] = useState({ especie: '', sexo: '', porte: '' });

  useEffect(() => {
    const fetchAnimais = async () => {
      setLoading(true);
      setError(null);
      try {
        // Quando implementar os filtros, você poderá adicioná-los à URL
        // ex: const url = new URL(API_ROUTES.listarAnimaisDisponiveis);
        // url.searchParams.append('especie', filtros.especie);
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
  }, []); // Adicione 'filtros' como dependência quando implementar

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className={styles.filtroItem}>Erro: {error}</div>;
  }

  return (
    <div className={styles.mainComFiltro}>
      <aside className={styles.filtros}>
        <h3>Filtros</h3>
        <div className={styles.filtroGrupo}>
          <p>Espécie</p>
          {/* Lógica de filtro a ser implementada */}
          <button>Cachorro</button>
          <button>Gato</button>
        </div>
        <div className={styles.filtroGrupo}>
          <p>Sexo</p>
          <button>Macho</button>
          <button>Fêmea</button>
        </div>
      </aside>
      
      <div style={{flex: 1}}>
        {animais.length === 0 && !loading ? (
          <p>Nenhum animal encontrado com os filtros selecionados.</p>
        ) : (
          <div className={styles.pets}>
          {animais.map((animal) => (
              <div key={animal.id_animal} className={styles.pet}>
                <img 
                  src={`http://localhost:3001/uploads/${animal.imagem_animal}`} 
                  alt={`Foto de ${animal.nome}`} 
                />
                <h4 className={styles.name}>{animal.nome}</h4>
                <p className={styles.species}>{animal.especie}</p>
                <p className={animal.sexo === 'Fêmea' ? styles.femea : styles.macho}>{animal.sexo}</p>
                <span className={animal.status === 'disponivel' ? styles.disponivel : styles.adopted}>
                  {animal.status}
                </span>
                <Link href={`/animal/${animal.id_animal}`} className={styles.link}>
                    Ver mais
                </Link>
              </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}