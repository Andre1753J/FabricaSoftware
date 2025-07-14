"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./Header.module.css";

export default function Header() {
    const [abrir, setAbrir] = useState(false);
    const [logado, setLogado] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const key = localStorage.getItem("clienteKey");
        if (key) setLogado(true);
    }, []);

    function abrirCoisa() {
        if (logado) {
            setAbrir(!abrir);
        } else {
            router.push('/telaLogin');
        }
    }

    function fecharDropdown() {
        setAbrir(false);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image className={styles.img} width={80} height={80} src="/images/Logo Pet shop roxo.png" alt='logo Pets World' />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li>
                        <Link href={logado ? "/pagInfo" : "/"}>Início</Link>
                    </li>
                    <li>
                        <Link href='/sobreNos'>Sobre</Link>
                    </li>
                    <li>
                        <Link href='/telaContato'>Contatos</Link>
                    </li>
                    <li className={styles.servicoContainer}>
                        <span className={styles.nada} onClick={abrirCoisa}>Serviços</span>
                        {abrir && (
                            <div className={styles.divNHeader}>
                                <div className={styles.dropdownRow}>
                                    <Link className={styles.dropBotao} href='/Cadastro_A' onClick={fecharDropdown}>
                                        Criar Ficha Animal
                                    </Link>
                                    <Link className={styles.dropBotao} href='/adocao' onClick={fecharDropdown}>
                                        Tela de Adoção
                                    </Link>
                                    <Link className={styles.dropBotao} href='/telaConta' onClick={fecharDropdown}>
                                        Conta
                                    </Link>
                                </div>
                                <div className={styles.dropdownRow}>
                                    <Link className={styles.dropBotao} href='/meus-pedidos' onClick={fecharDropdown}>
                                        Meus Pedidos
                                    </Link>
                                    <Link className={styles.dropBotao} href='/solicitacoes' onClick={fecharDropdown}>
                                        Solicitações Recebidas
                                    </Link>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            <div>
                <Image className={styles.img} width={70} height={70} src="/images/noIcon.png" alt='F4' />
            </div>
        </header>
    );
}
