"use client";
import styles from './sobrenos.module.css'
import Image from 'next/image'

export default function SobreNos() {
    return (
        <section className={styles.sobre_nos}>
            <h1 className={styles.h1}>SOBRE NÓS</h1>
            <div className={styles.membros}>
                <div className={styles.membro}>
                    <Image src="/images/andre.jpg" alt="André" width={1000} height={1000} />
                    <p className={styles.integrantes}>André</p>
                </div>
                <div className={styles.membro}>
                    <Image src="/images/julio.jpg" alt="Julio" width={1000} height={1000} />
                    <p className={styles.integrantes}>Julio</p>
                </div>
                <div className={styles.membro}>
                    <Image src="/images/ikarus.jpg" alt="Ikarus" width={1000} height={1000} />
                    <p className={styles.integrantes}>Ikarus</p>
                </div>
                <div className={styles.membro}>
                    <Image src="/images/brenda.jpg" alt="Brenda" width={1000} height={1000} />
                    <p className={styles.integrantes}>Brenda</p>
                </div>
            </div>
            <p className={styles.parag}>
                Estudantes do IFRO (Instituto Federal de Educação, Ciência e Tecnologia de Rondônia), que estão fazendo um site sobre adoção de animais para a matéria de fábrica de software com o intuito de poder ganhar experiência em novas áreas.
            </p>
        </section>
    )
}