'use client';
import styles from './adocao.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


const pets = [
  { nome: "Brawl Stars", sexo: "macho", status: "disponivel", porte: "pequeno", imagem: "Ellipse 14.webp" },
  { nome: "Luna", sexo: "femea", status: "adotado", porte: "medio", imagem: "Ellipse 15.webp" },
  { nome: "Juninho Ruindade Pura", sexo: "macho", status: "adotado", porte: "grande", imagem: "Ellipse 19.webp" },
  { nome: "Mimi", sexo: "femea", status: "disponivel", porte: "pequeno", imagem: "Ellipse 17.webp" },
  { nome: "Black Opps II", sexo: "macho", status: "disponivel", porte: "medio", imagem: "Ellipse 18.webp" },
  { nome: "Rei da coitadolandia", sexo: "macho", status: "disponivel", porte: "grande", imagem: "Ellipse 16.webp" },
  { nome: "Ze Ruelinha", sexo: "macho", status: "disponivel", porte: "pequeno", imagem: "Ellipse 20.webp" },
  { nome: "Buck", sexo: "macho", status: "disponivel", porte: "medio", imagem: "Ellipse 21.webp" }
];

export default function TelaAdocao() {
  const [filtros, setFiltros] = useState({
    porte: 'todos',
    sexo: 'todos',
    status: 'todos'
  });

  const handleFiltro = (tipo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [tipo]: valor
    }));
  };

  
  const petsFiltrados = pets.filter(pet =>
    (filtros.porte === 'todos' || pet.porte === filtros.porte) &&
    (filtros.sexo === 'todos' || pet.sexo === filtros.sexo) &&
    (filtros.status === 'todos' || pet.status === filtros.status)
    
  );

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
          <p>Status:</p>
          <button onClick={() => handleFiltro('status', 'todos')}>Todos</button>
          <button onClick={() => handleFiltro('status', 'disponivel')}>Disponível</button>
          <button onClick={() => handleFiltro('status', 'adotado')}>Adotado</button>
        </div>
      </aside>

      <section className={styles.filtrosAtivos}>
  <h4>Filtros ativos:</h4>
  <div className={styles.filtroItem}>
    <strong>Porte:</strong> {filtros.porte === 'todos' ? 'Qualquer' : filtros.porte}
  </div>
  <div className={styles.filtroItem}>
    <strong>Sexo:</strong> {filtros.sexo === 'todos' ? 'Qualquer' : filtros.sexo}
  </div>
  <div className={styles.filtroItem}>
    <strong>Status:</strong> {filtros.status === 'todos' ? 'Qualquer' : filtros.status}
  </div>
</section>

      <section className={styles.pets}>
        {petsFiltrados.map((pet, index) => (
          <div key={index} className={styles.pet}>
            <Image
              src={`/images/${pet.imagem}`}
              alt={pet.nome}
              width={100}
              height={100}
            />
            <p className={styles.name}>{pet.nome}</p>
            <strong className={pet.sexo === 'macho' ? styles.macho : styles.femea}>
              {pet.sexo === 'macho' ? 'Macho' : 'Fêmea'}
            </strong>
            <span className={pet.status === 'disponivel' ? styles.disponivel : styles.adopted}>
              {pet.status === 'disponivel' ? 'DISPONÍVEL' : 'JÁ ADOTADO'}
            </span>
            {pet.status === 'disponivel' && (
              <Link className={styles.link} href="/confirmaAdocao">
                Adotar
              </Link>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
