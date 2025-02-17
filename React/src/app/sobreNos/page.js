import styles from './sobrenos.module.css'
import Image from 'next/image'

export default function sobrenos() {
    return (
            <section id="sobre-nos">
                <h1>SOBRE NÓS</h1>
                <div className="membros">
                    <div className="membro">
                        <Image src="andre.jpg" alt="André"/> 
                        <p>André</p>
                    </div>
                    <div className="membro">
                        <Image src="julio.jpg" alt="Julio"/>
                        <p>Julio</p>
                    </div>
                    <div className="membro">
                        <Image src="ikarus.jpg" alt="Ikarus"/>
                        <p>Ikarus</p>
                    </div>
                    <div className="membro">
                        <Image src="brenda.jpg" alt="Brenda"/>
                        <p>Brenda</p>
                    </div>
                </div>
                <p>Estudantes do IFRO (Instituto Federal de Educação, Ciência e Tecnologia de Rondônia), que estão fazendo um site sobre adoção de animais para a matéria de fábrica de software com o intuito de poder ganhar experiência em novas áreas.</p>
            </section>
        
            )
}