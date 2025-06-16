"use client";
import RotaSegura from '@/components/rotaSegura';
import styles from './adocao.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function ConfirmarAdocao() {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        // Aqui você pode adicionar lógica para salvar ou processar a adoção
        setIsConfirmed(true);
    };

    const handleCancel = () => {
        // A lógica para cancelar pode ser redirecionar ou limpar informações, por exemplo
        alert('Adoção cancelada!');
    };

    return (
        <RotaSegura>
            <main className={styles.main}>
                {/* Informações Gerais */}
                <div className={styles.info}>
                    <h1>INFORMAÇÕES GERAIS</h1>
                </div>

                {/* Container Principal com a Imagem e as Informações do Gato */}
                <div className={styles.container}>
                    <div className={styles.gato}>
                        <Image
                            src="/images/brawlGato.png"
                            alt="Gato Brawl Stars"
                            width={400}
                            height={400}
                            className={styles.cat}
                        />
                    </div>

                    <div className={styles.info_gerais}>
                        <p className={styles.palavra}><strong>Nome:</strong> Brawl Stars</p>
                        <p className={styles.palavra}><strong>Raça:</strong> Tigrado</p>
                        <p className={styles.palavra}><strong>Pelagem:</strong> Curta</p>
                        <p className={styles.palavra}><strong>Idade:</strong> 6 meses</p>
                        <p className={styles.palavra}><strong>Gênero:</strong> Macho</p>
                    </div>
                </div>

                {/* Descrição adicional do Gato */}
                <div className={styles.info_gato}>
                    <p className={styles.palavra}>
                        Que sou elegante e distinto isso minha foto já diz! E, por isso, meu nome é sinônimo de todos esses elogios
                        - Brawl Stars! Sou mesmo um tigrado cheio de pose e formoso, muito bonzinho e amoroso!
                    </p>
                </div>

                {/* Botões de Confirmar e Cancelar */}
                <div className={styles.botaos}>
                    <button
                        className={styles.bot_1}
                        onClick={handleConfirm}
                        aria-label="Confirmar Adoção"
                    >
                        Confirmar
                    </button>
                    <button
                        className={styles.bot_2}
                        onClick={handleCancel}
                        aria-label="Cancelar Adoção"
                    >
                        Cancelar
                    </button>
                </div>

                {/* Feedback de Adoção Confirmada */}
                {isConfirmed && (
                    <div className={styles.confirmation}>
                        <p className={styles.palavra}>Adoção confirmada com sucesso!</p>
                    </div>
                )}
            </main>
        </RotaSegura>
    );
}
