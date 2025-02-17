import styles from './exclusao.module.css'
import Image from 'next/image'


export default function exclusao() {
    <div className={styles.container}>
        <div className={styles.deletebox}>
            <h2 className={styles.titulo}> EXCLUSÃO DE USUÁRIO</h2>
            <div className={styles.userinfo}>
                <Image className={styles.imagem} widht={50} height={50} src="img/Ellipse 3.png" alt="User Photo"/>
                <div>
                    <p><strong>Roberto Arabe</strong></p>
                    <p>Robertoarabe1985@gmail.com</p>
                </div>
            </div>
            <button>Excluir Usuário</button>
            <button classname={styles.secondarybutton}>Excluir usuário e conteúdo</button>
        </div>
    </div>
}