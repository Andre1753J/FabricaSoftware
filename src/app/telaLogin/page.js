'use client';

import styles from './telaLogin.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TelaLogin() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validação de login aqui
        console.log('Login enviado');
        router.push('/pagInfo');
    };

    return (
        <div className={styles.div_pai}>
            <main className={styles.main}>
                <h1 className={styles.card_titulo}>Login do Usuário</h1>
                
                <form className={styles.card_form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.email} htmlFor="email">E-mail</label>
                        <input 
                            className={styles.inpt_email} 
                            id="email" 
                            name="email" 
                            placeholder="Digite seu endereço de email" 
                            type="email" 
                            required 
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.pass} htmlFor="password">Senha</label>
                        <input 
                            className={styles.inptpass} 
                            id="password" 
                            name="password" 
                            placeholder="Digite sua senha" 
                            type="password" 
                            required 
                        />
                    </div>

                    <button className={styles.button} type="submit">Continuar</button>
                </form>

                <p className={styles.card_texto}>
                    Não tem cadastro?
                    <Link href="/Cadastro_C" className={styles.card_cada}> Cadastra-se </Link>
                </p>
            </main>
        </div>
    );
}


                    // <div className={styles.formGroup}>
                    //     <label className={styles.label} htmlFor="email">EMAIL</label>
                    //     <input className={styles.input} id="email" name="email" placeholder="Digite seu endereço de email" type="email" required />
                    // </div>
                    // <div className={styles.formGroup}>
                    //     <label className={styles.label} htmlFor="pass">SENHA</label>
                    //     <input className={styles.input} id="pass" name="pass" placeholder="Digite a senha para ser cadastrada" type="password" minLength="8" required />
                    // </div>