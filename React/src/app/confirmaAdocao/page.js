import styles from './adocao.module.css';
import Image from 'next/image';

export default function ConfirmarAdocao() {
    return (
        <main className={styles.main}>
            <div className={styles.info}>
                <h1>INFORMAÇÕES GERAIS</h1>
            </div>

            <div className={styles.gato}>
                <Image src="/images/brawlGato.png" alt="Gato" width={500} height={500} className={styles.cat} />
            </div>

            <div className={styles.info_gato}>
                <p className={styles.palavra}>
                    Que sou elegante e distinto isso minha foto já diz! E, por isso, meu nome é sinônimo de todos esses elogios
                    - Brawl stars! Sou mesmo um tigrado cheio de pose e formoso, muito bonzinho e amoroso!
                </p>
            </div>

            <div className={styles.info_gerais}>
                <p className={styles.palavra}>Nome: Brawl Stars</p>
                <p className={styles.palavra}>Raça: Tigrado</p>
                <p className={styles.palavra}>Pelagem: Curta</p>
                <p className={styles.palavra}>Idade: 6 meses</p>
                <p className={styles.palavra}>Gênero: Macho</p>
            </div>

            <div className={styles.botaos}>
                <button className={styles.bot_1}>Confirmar</button>
                <button className={styles.bot_2}>Cancelar</button>
            </div>

            {/* <div className={styles.but}>
                <Image className={styles.seta} src="/images/mdi--arrow-back-circle.png" alt="Seta" width={40} height={40} />
                <button className={styles.voltar}>Voltar</button>
            </div> Potencialmente nao ira entrar no projeto final */}
        </main>
    );
}