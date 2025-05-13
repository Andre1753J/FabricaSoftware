import styles from './cadastro_C.module.css';
import Link from 'next/link';

export default function Cliente() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Cadastro Cliente</h1>
                
                <form className={styles.form} action="/Cadastro_C2" method="POST">
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">EMAIL</label>
                        <input className={styles.input} id="email" name="email" placeholder="Digite seu endereço de email" type="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pass">SENHA</label>
                        <input className={styles.input} id="pass" name="pass" placeholder="Digite a senha para ser cadastrada" type="password" minLength="8" required />
                    </div>

                    <button type="submit" className={styles.button}>Continuar</button>
                </form>
            </div>
        </section>
    );
}
