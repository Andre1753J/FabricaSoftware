'use client';
import styles from './adocao.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../lib/api';

export default function TelaAdocao() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    porte: 'todos',
    sexo: 'todos',
    especie: 'todos'
  });

  const handleFiltro = (tipo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [tipo]: valor
    }));
  };

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      const params = new URLSearchParams();

      if (filtros.porte !== 'todos') {
        params.append('porte', filtros.porte);
      }
      if (filtros.sexo !== 'todos') {
        params.append('sexo', filtros.sexo);
      }
      if (filtros.especie !== 'todos') {
        params.append('especie', filtros.especie);
      }

      try {
        const res = await fetch(`${API_BASE_URL}/filtrar_animais?${params.toString()}`);
        if (!res.ok) {
          // Tenta ler a mensagem de erro específica do backend
          const errorData = await res.json().catch(() => null);
          const errorMessage = errorData?.error || `Falha ao buscar os animais (Status: ${res.status})`;
          throw new Error(errorMessage);
        }
        const data = await res.json();
        setPets(data.data || []);
      } catch (error) {
        console.error("Erro ao carregar pets:", error.message);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [filtros]);

  return (
    <main className={styles.mainComFiltro}>
      <aside className={styles.filtros}>
        <h3>Filtrar por características</h3>

        <div className={styles.filtroGrupo}>
          <p>Porte:</p>
          <button onClick={() => handleFiltro('porte', 'todos')}>Todos</button>
          <button onClick={() => handleFiltro('porte', 'pequeno')}>Pequeno</button>
          <button onClick={() => handleFiltro('porte', 'medio')}>Médio</button>
          <button onClick={() => handleFiltro('porte', 'grande')}>Grande</button>
        </div>

        <div className={styles.filtroGrupo}>
          <p>Sexo:</p>
          <button onClick={() => handleFiltro('sexo', 'todos')}>Todos</button>
          <button onClick={() => handleFiltro('sexo', 'macho')}>Macho</button>
          <button onClick={() => handleFiltro('sexo', 'femea')}>Fêmea</button>
        </div>

        <div className={styles.filtroGrupo}>
          <p>Espécie:</p>
          <button onClick={() => handleFiltro('especie', 'todos')}>Todos</button>
          <button onClick={() => handleFiltro('especie', 'Cachorro')}>Cachorro</button>
          <button onClick={() => handleFiltro('especie', 'Gato')}>Gato</button>
        </div>
      </aside>

      <div style={{ flex: 1 }}>
        <section className={styles.filtrosAtivos}>
          <h4>Filtros ativos:</h4>
          <div className={styles.filtroItem}>
            <strong>Porte:</strong> {filtros.porte === 'todos' ? 'Qualquer' : filtros.porte}
          </div>
          <div className={styles.filtroItem}>
            <strong>Sexo:</strong> {filtros.sexo === 'todos' ? 'Qualquer' : filtros.sexo}
          </div>
          <div className={styles.filtroItem}>
            <strong>Espécie:</strong> {filtros.especie === 'todos' ? 'Qualquer' : filtros.especie}
          </div>
        </section>

        <section className={styles.pets}>
          {loading ? (
            <p>Carregando animais...</p>
          ) : pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet.id} className={styles.pet}>
                <Image
                  src={pet.imagem ? `${API_BASE_URL}/imagem/${pet.imagem}` : '/images/placeholder.png'}
                  alt={pet.nome}
                  width={100}
                  height={100}
                />
                <p className={styles.name}>{pet.nome}</p>
                <p className={styles.species}>{pet.especie}</p>
                <strong className={pet.sexo === 'macho' ? styles.macho : styles.femea}>
                  {pet.sexo === 'macho' ? 'Macho' : 'Fêmea'}
                </strong>
                <span className={pet.disponivel ? styles.disponivel : styles.adopted}>
                  {pet.disponivel ? 'DISPONÍVEL' : 'JÁ ADOTADO'}
                </span>
                {pet.disponivel && (
                  <Link className={styles.link} href={`/confirmaAdocao/${pet.id}`}>
                    Adotar
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p>Nenhum animal encontrado com esses filtros.</p>
          )}
        </section>
      </div>
    </main>
  );
}
