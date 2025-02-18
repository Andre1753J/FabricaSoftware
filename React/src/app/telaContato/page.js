import styles from './contato.module.css'
import Image from 'next/image'

export default function contato() {
    return (
        <section className={styles.main}>
            <section className={styles.contato}>
                <h1 className={styles}>ENTRE EM CONTATO CONOSCO!</h1>
                <div className={styles.container}>
                    <div className={styles.contato}>
                        <span className={styles.info}>69 9985-5963</span>
                    </div>
                    <div className={styles.contato}>
                        <span className={styles.info}>petsworldsupport@gmail.com</span>
                    </div>
                    <div className={styles.contato}>
                        <span className={styles.info}>3322-6585</span>
                    </div>
                </div>
            </section>
        </section>
    )
}