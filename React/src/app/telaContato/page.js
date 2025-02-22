import styles from './contato.module.css'

export default function Contato() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2 className={styles.titulo}>ENTRE EM CONTATO CONOSCO</h2>
                <div className={styles.contato}>
                    <h3 className={styles.info}>69 9985-5963</h3>
                </div>
                <div className={styles.contato}>
                    <h3 className={styles.info}>petsworldsuport@gmail.com</h3>
                </div>
                <div className={styles.contato}>
                    <h3 className={styles.info}>3322-6585</h3>
                </div>
            </div>
        </main>
    )
}