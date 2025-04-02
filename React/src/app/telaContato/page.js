import styles from './contato.module.css'

export default function Contato() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2 className={styles.titulo}>ENTRE EM CONTATO CONOSCO</h2>

                <div className={styles.card_segundo}>
                    <div className={styles.card_link}>
                        <a href="https://www.whatsapp.com"><img className={styles.wts} src="/images/whatsapp_256_black.png" alt="WhatsApp" /></a>
                        <a href="https://www.instagram.com"><img className={styles.itg} src="/images/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.webp" alt="Instagram" /></a>
                        <a href="https://facebook.com"><img className={styles.fbk} src="/images/facebook2.png" alt="facebook"></img></a>
                    </div>
                </div>
                <div className={styles.div_2}>
                <div className={styles.caixa_mensagem}>
                            <label className={styles.box_txt}>Dúvida</label>
                            <input className={styles.inpt_txt} type='textarea' id='txt' placeholder='Diga-nos sua dúvida'></input>
                        </div>
                </div>
            </div>
        </main>
    )
}