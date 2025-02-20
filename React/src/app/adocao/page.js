import styles from './adocao.module.css'
import Image from 'next/image'

export default function adocao() {
    return (
    <section className={styles.pets}>
        <div>
        </div>
        <div className={styles.pet}>
            <Image  src="/images/brawl-stars.png" width={80} height={80} alt="Brawo Stars"/>
            <p>Brawl Stars</p>
            <strong>Macho</strong>
            <span className={styles.adopted}>JÁ ADOTADO</span>
        </div>
        <div className={styles.pet}>
            <Image  src="/images/luna.png" width={80} height={80} alt="Luna"/>
            <p>Luna</p>
            <strong>Fêmea</strong>
            <span className={styles.adopted}>JÁ ADOTADO</span>
        </div>

        <div className={styles.pet}>
            <Image  src="/images/mimi.png" width={80} height={80} alt="Macho"/>
            <p>Mimi</p>
            <strong>Macho</strong>
            <span className={styles.disponivel}>DISPONIVEL</span>
        </div>
        <div className={styles.pet}>
            <Image  src="/images/black-opps-II.png" width={80} height={80} alt="Fêmea"/>
            <p>Black Opps II</p>
            <strong>Macho</strong>
            <span className={styles.disponivel}>DISPONIVEL</span>
        </div>
        <div className={styles.pet}>
            <Image  src="/images/rei-da-coitadolandia.png" width={80} height={80} alt="Fêmea"/>
            <p>Rei da coitadolandia</p>
            <strong>Macho</strong>
            <span className={styles.disponivel}>DISPONIVEL</span>
        </div>
        <div className={styles.pet}>
            <Image  src="/images/ze-ruelinha.png" width={80} height={80} alt="Fêmea"/>
            <p>Ze Ruelinha</p>
            <strong>Macho</strong>
            <span className={styles.disponivel}>DISPONIVEL</span>
        </div>
        <div className={styles.pet}>
            <Image  src="/images/buck.png" width={80} height={80} alt="Fêmea"/>
            <p>Buck</p>
            <strong>Macho</strong>
            <span className={styles.disponivel}>DISPONIVEL</span>
        </div>
    </section>
)}