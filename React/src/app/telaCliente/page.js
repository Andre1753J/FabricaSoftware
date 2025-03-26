import styles from './telaCliente.module.css';
import Link from 'next/link';

export default function Cliente() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Cadastro Cliente</h1>
                
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="nome">NOME</label>
                        <input className={styles.input} id="nome" placeholder="Digite seu nome" type="text" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="idade">DATA DE NASCIMENTO</label>
                        <input className={styles.input} id="idade" placeholder="Digite sua data de nascimento" type="number" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="sexo">SEXO</label>
                        <select className={styles.select} id="sexo" required>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rg">RG</label>
                        <input className={styles.input} id="rg" placeholder="Número de RG" type="text" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="cpf">CPF</label>
                        <input className={styles.input} id="cpf" placeholder="Digite seu CPF" type="text" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">EMAIL</label>
                        <input className={styles.input} id="email" placeholder="Digite seu endereço de email" type="email" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="endereco">ENDEREÇO</label>
                        <input className={styles.input} id="endereco" placeholder="Digite o endereço da sua residência" type="text" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="cep">CEP</label>
                        <input className={styles.input} id="cep" placeholder="Digite seu código postal" type="text" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="porte">PORTE DO ANIMAL</label>
                        <input className={styles.input} id="porte" placeholder="Complemento do endereço da sua residência" type="text" />
                    </div>
                </form>

                <Link href="/pagInfo" className={styles.link}>
                    <button className={styles.button}>Continuar</button>
                </Link>
            </div>
        </section>
    );
}