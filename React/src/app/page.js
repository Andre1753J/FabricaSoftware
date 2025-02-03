import Image from "next/image"
import styles from "./page.module.css"

export default function Inicial() {
    return (
        <div>
            <section className={styles.card-pai}>
                <div className={styles.apresentacao}>
                    <div className={styles.card-titulo}>
                        <h1 className={styles.gradient}>PET'S WORLD</h1>
                    </div>
                    <div className={styles.card-botoes}>
                        <button className={styles.botao}>
                            <a href="FichaCliente.html">Cadastrar</a>
                        </button>
                        <button className={styles.botao}>
                            <a href="LoginUsuario.html">Login</a>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}