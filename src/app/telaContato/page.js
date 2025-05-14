import styles from './contato.module.css'
import Image from 'next/image'

export default function Contato() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2 className={styles.titulo}>ENTRE EM CONTATO CONOSCO</h2>

                <div className={styles.card_segundo}>
                    <div className={styles.card_link}>
                        <a 
                            href="https://www.whatsapp.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                        >
                            <Image 
                                className={styles.wts} 
                                src="/images/whatsapp_256_black.png" 
                                alt="Ícone do WhatsApp" 
                                width={40} 
                                height={40} 
                            />
                        </a>
                        <a 
                            href="https://www.instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <Image 
                                className={styles.itg} 
                                src="/images/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.webp" 
                                alt="Ícone do Instagram" 
                                width={40} 
                                height={40} 
                            />
                        </a>
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <Image 
                                className={styles.fbk} 
                                src="/images/facebook2.png" 
                                alt="Ícone do Facebook"
                                width={40}
                                height={40}
                            />
                        </a>
                    </div>
                </div>

                <div className={styles.div_2}>
                    <div className={styles.title}>
                        <h1 className={styles.title_main}>Dúvida</h1>
                    </div>
                    <div className={styles.caixa_mensagem}>
                        <input 
                            className={styles.inpt_txt} 
                            type="text" 
                            id="txt" 
                            placeholder="Diga-nos sua dúvida" 
                            aria-label="Mensagem de contato"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
