import styles from './sobrenos.module.css'
import Image from 'next/image'


export default function sobrenos() {
    return (
            <section className={styles.sobre_nos}>
                <h1 className={styles.h1}>SOBRE NÓS</h1>
                <div className={styles.membros}>
                    <div className={styles.membro}>
                        <Image src="/andre.jpg" alt="" width={100} height={100}/> 
                        <p className={styles.integrantes}>André</p>
                    </div>
                    <div className={styles.membro}>
                        <Image src="/julio.jpg" alt="" width={100} height={100}/>
                        <p className={styles.integrantes}>Julio</p>
                    </div>
                    <div className={styles.membro}>
                        <Image className={styles.img} src="/ikarus.jpg" alt="" width={100} height={100}/>
                        <p className={styles.integrantes}>Ikarus</p>
                    </div>
                    <div className={styles.membro}>
                        <Image src="/brenda.jpg" alt="" width={100} height={100}/>
                        <p className={styles.integrantes}>Brenda</p>
                    </div>
                </div>
                <p className={styles.parag}>Estudantes do IFRO (Instituto Federal de Educação, Ciência e Tecnologia de Rondônia), que estão fazendo um site sobre adoção de animais para a matéria de fábrica de software com o intuito de poder ganhar experiência em novas áreas.</p>
            </section>
        
            )
}
