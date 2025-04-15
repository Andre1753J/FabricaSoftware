import styles from './cadastro_C.module.css';
import Link from 'next/link';

export default function Cliente() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Cadastro Cliente</h1>
                
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">EMAIL</label>
                        <input className={styles.input} id="email" placeholder="Digite seu endereço de email" type="email" required />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor='pass'>SENHA</label>
                        <input className={styles.input} id="pass" placeholder="Digite a senha para ser cadastrada" type="password" minLength="8"/>
                    </div>
                </form>
            
                <Link href="/pagInfo" className={styles.link}>
                    <button className={styles.button}>Continuar</button>
                </Link>
            </div>
        </section>
    );
}