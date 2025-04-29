import Image from "next/image"
import styles from './Footer.module.css'
// footer-column
export default () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footercontainer}>

                <div className={styles.footercolumn}>
                    <h3>Fale Conosco</h3>
                    <p>Suporte: +55 69 8469-8476 <span className={styles.whatsappicon}>📱</span></p>
                    <p>Comercial: +55 69 8469-8476</p>
                    <p>E-mail: <a href="ghilarionoa@gmail.com">ghilarionoa@gmail.com</a></p>
                </div>

                <div className={styles.footercolumn}>
                    <h3>Endereço</h3>
                    <p>BR-174, Km 3 S/n - Zona Urbana</p>
                    <p>CEP 76980-000. Vilhena/RO</p>
                </div>

                <div className={styles.footercolumn}>
                    <h3>Filiado</h3>
                    <div className={styles.footerlogos}>
                        <Image width={100} height={29} src="/images/logoifro.png" alt="Logo ifrozada"/>
                    </div>
                </div>

                <div className={styles.footercolumn}>
                    <h3>Legal</h3>
                    <a href="#">Política de privacidade</a>
                    <a href="#">Termos de uso</a>
                </div>
            </div>

            <div className={styles.footerbottom}>
                © 2024 Pet´s World. Todos os direitos reservados
            </div>
        </footer>
    )
}