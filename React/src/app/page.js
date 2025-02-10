import Image from "next/image"
import styles from "./page.module.css"

export default function Inicial() {
    return (
        <div className={styles.body}>
            <section className={styles.cardpai}>
                <div className={styles.apresentacao}>
                    <div className={styles.cardtitulo}>
                        <h1 className={styles.gradient}>PET'S WORLD</h1>
                    </div>
                    <div className={styles.cardbotoes}>
                        <button className={styles.botao}>
                            <a className={styles.ancora} href="FichaCliente.html">Cadastrar</a>
                        </button>
                        <button className={styles.botao}>
                            <a className={styles.ancora}href="LoginUsuario.html">Login</a>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}