'use client';
import styles from './adocao.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


const pets = [
  { nome: "Brawl Stars", sexo: "macho", status: "disponivel", imagem: "Ellipse 14.webp" },
  { nome: "Luna", sexo: "femea", status: "adotado", imagem: "Ellipse 15.webp" },
  { nome: "Juninho Ruindade Pura", sexo: "macho", status: "adotado", imagem: "Ellipse 19.webp" },
  { nome: "Mimi", sexo: "femea", status: "disponivel", imagem: "Ellipse 17.webp" },
  { nome: "Black Opps II", sexo: "macho", status: "disponivel", imagem: "Ellipse 18.webp" },
  { nome: "Rei da coitadolandia", sexo: "macho", status: "disponivel", imagem: "Ellipse 16.webp" },
  { nome: "Ze Ruelinha", sexo: "macho", status: "disponivel", imagem: "Ellipse 20.webp" },
  { nome: "Buck", sexo: "macho", status: "disponivel", imagem: "Ellipse 21.webp" },
];

export default function TelaAdocao() {
  const [filtroPorte, setFiltroPorte] = useState('todos');
  const [filtroSexo, setFiltroSexo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');


const petsFiltrados = pets.filter(pet => {
  const porPorte = filtroPorte === 'todos' || pet.porte === filtroPorte;
  const porSexo = filtroSexo === 'todos' || pet.sexo === filtroSexo;
  const porStatus = filtroStatus === 'todos' || pet.status === filtroStatus;
  return porPorte && porSexo && porStatus;
});

  return (

    <main className={styles.mainComFiltro}>
      <section className={styles.pets}>
        <main className={styles.mainComFiltro}>
  <aside className={styles.filtros}>
    <h3>Filtrar por características</h3>

    <div className={styles.filtroGrupo}>
      <p>Porte:</p>
      <button onClick={() => setFiltroPorte('todos')}>Todos</button>
      <button onClick={() => setFiltroPorte('pequeno')}>Pequeno</button>
      <button onClick={() => setFiltroPorte('medio')}>Médio</button>
      <button onClick={() => setFiltroPorte('grande')}>Grande</button>
    </div>

    <div className={styles.filtroGrupo}>
      <p>Sexo:</p>
      <button onClick={() => setFiltroSexo('todos')}>Todos</button>
      <button onClick={() => setFiltroSexo('macho')}>Macho</button>
      <button onClick={() => setFiltroSexo('femea')}>Fêmea</button>
    </div>

    <div className={styles.filtroGrupo}>
      <p>Status:</p>
      <button onClick={() => setFiltroStatus('todos')}>Todos</button>
      <button onClick={() => setFiltroStatus('disponivel')}>Disponível</button>
      <button onClick={() => setFiltroStatus('adotado')}>Adotado</button>
    </div>
  </aside>

  <section className={styles.pets}>
    {petsFiltrados.map((pet, index) => (
      <div key={index} className={styles.pet}>
      </div>
    ))}
  </section>
</main>
        {pets.map((pet, index) => (
          <div key={index} className={styles.pet}>
            <Image
              src={`/images/${pet.imagem}`}
              alt={pet.nome}
              width={100}
              height={100}
              priority={index === 0} 
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
