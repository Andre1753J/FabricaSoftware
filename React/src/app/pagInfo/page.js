import styles from './paginfo.module.css';

export default function PagInfo() {
    return (
        <main className={styles.main}>
            <div className={styles.card_primeiro}>
                <p className={styles.card_text_1}>Navegue pelo nosso site e conheça os cães e gatos que esperam ansiosamente por uma família para amar. Você encontrará fotos, histórias e informações detalhadas sobre cada um deles.</p>
                <h1 className={styles.titulo1}>Bem-Vindos ao<br />Pet’s World!</h1>
                <a href="/adocao"><button className={styles.adt}>Adote</button></a>
            </div>
            <div className={styles.card_segundo}>
                <p className={styles.card_text_2}>Aqui no Pet's World, acreditamos que todo animal merece um lar cheio de amor. 💖 Somos um site dedicado a conectar animais em busca de um lar com pessoas que sonham em ter um companheiro de quatro patas. 🐾</p>
                <div className={styles.card_link}>
                    <a href="https://www.whatsapp.com"><img className={styles.wts} src="/images/whatsapp_256_black.png" alt="WhatsApp" /></a>
                    <a href="https://www.instagram.com"><img className={styles.itg} src="/images/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.webp" alt="Instagram" /></a>
                </div>
            </div>
        </main>
    );
}