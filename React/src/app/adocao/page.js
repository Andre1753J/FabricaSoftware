import styles from './adocao.module.css'
import Image from 'next/image'
import Link from "next/link";

export default function TelaAdocao() {
    return (
        <main className={styles.main}>
            <section className={styles.pets}>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 14.png" alt="Brawl Stars" width={100} height={100} />
                    <p>Brawl Stars</p>
                    <strong>Macho</strong>
                    <span className={styles.disponivel}>DISPONÍVEL</span>
                    <Link className={styles.link} href='/confirmaAdocao'>Adotar</Link>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 15.png" alt="Luna" width={100} height={100} />
                    <p>Luna</p>
                    <strong>Fêmea</strong>
                    <span className={styles.adopted}>JÁ ADOTADO</span>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 19.png" alt="Juninho Ruindade Pura" width={100} height={100} />
                    <p>Juninho Ruindade Pura</p>
                    <strong>Macho</strong>
                    <span className={styles.adopted}>JÁ ADOTADO</span>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 17.png" alt="Mimi" width={100} height={100} />
                    <p>Mimi</p>
                    <strong>Macho</strong>
                    <span className={styles.disponivel}>DISPONÍVEL</span>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 18.png" alt="Black Opps II" width={100} height={100} />
                    <p>Black Opps II</p>
                    <strong>Macho</strong>
                    <span className={styles.disponivel}>DISPONÍVEL</span>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 16.png" alt="Rei da coitadolandia" width={100} height={100} />
                    <p>Rei da coitadolandia</p>
                    <strong>Macho</strong>
                    <span className={styles.disponivel}>DISPONÍVEL</span>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 20.png" alt="Ze Ruelinha" width={100} height={100} />
                    <p>Ze Ruelinha</p>
                    <strong>Macho</strong>
                    <span className={styles.disponivel}>DISPONÍVEL</span>
                </div>
                <div className={styles.pet}>
                    <Image src="/images/Ellipse 21.png" alt="Buck" width={100} height={100} />
                    <p>Buck</p>
                    <strong>Macho</strong>
                    <span className={styles.disponivel}>DISPONÍVEL</span>
                </div>
            </section>
        </main>
    )
}