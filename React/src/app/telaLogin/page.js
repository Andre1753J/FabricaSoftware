import styles from './telaLogin.module.css';
import Image from 'next/image';

export default function telaLogin() {
    return (
        <section className={styles.body}>
            <h1 className={styles.h1}>
                Login do Usuário
            </h1>

            <label className={styles.email}>

            </label>
            <label className={styles.password}>
                
            </label>
        </section>
    )
}