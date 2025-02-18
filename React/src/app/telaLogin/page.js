import styles from './telaLogin.module.css';
import Image from 'next/image';

export default function telaLogin() {
  return (
    <div className={styles.div_pai}>
      <main className={styles.main}>
        <h1 className={styles.card_titulo}>Login do Usuário</h1>
        <section>
          <label className={styles.email}>E-mail</label>
          <form className={styles.card_form_1}>

            <input className={styles.inpt_email} type="email" name="text" id="text" placeholder="Digite seu email" required />
          </form>
          <form className={styles.card_form_2}>
            <label className={styles.pass}>Senha</label>
            <input className={styles.inptpass} type="password" name="pass" id="pass" placeholder="Digite sua senha" required />
          </form>
        </section>
        <a href="#" className={styles.card_botao}>
          <button className={styles.button} >Continuar</button>
        </a>
        <p className={styles.card_texto}>
          Não tem cadastro?
          <a href="#" className={styles.card_cada}> Cadastra-se </a>
        </p>
      </main>
    </div>
  )
}