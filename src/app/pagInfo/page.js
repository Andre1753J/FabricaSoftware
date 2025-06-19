import styles from './paginfo.module.css';
import Link from 'next/link';

export default function PagInfo() {
    return (
        <main className={styles.main}>
            <section className={styles.card_primeiro}>
                <h1 className={styles.titulo1}>
                    Bem-Vindos ao <span className={styles.break}>Pet’s World!</span>
                </h1>
                <p className={styles.card_text_1}>
                    Navegue pelo nosso site e conheça os cães e gatos que esperam ansiosamente por uma família para amar.
                    Você encontrará fotos, histórias e informações detalhadas sobre cada um deles.
                </p>
                <Link href="/adocao" className={styles.adt}>Adote</Link>
            </section>

            <section className={styles.card_segundo}>
                <p className={styles.card_text_2}>
                    Aqui no Pet's World, acreditamos que todo animal merece um lar cheio de amor. 💖 Somos um site dedicado 
                    a conectar animais em busca de um lar com pessoas que sonham em ter um companheiro de quatro patas. 🐾
                </p>
            </section>
        </main>
    );
}
