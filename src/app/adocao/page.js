import styles from './adocao.module.css';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <main className={styles.main}>
      <section className={styles.pets}>
        {pets.map((pet, index) => (
          <div key={index} className={styles.pet}>
            <Image
              src={`/images/${pet.imagem}`}
              alt={pet.nome}
              width={100}
              height={100}
              priority={index === 0} // pré-carrega a 1ª imagem (LCP)
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
