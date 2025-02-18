"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";


export default function Header() {
    
    const [abrir, setAbrir] = useState(false);

    function abrirCoisa() {
        setAbrir(!abrir);
        console.log(abrir);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image className={styles.img} width={80} height={80} src="/images/Logo Pet shop roxo.png" alt='logo Pets World'/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.list}>
                        <Link href='/'>Holmes</Link>
                    </li>
                    <li className={styles.list}>
                        <Link href='/sobreNos'>Sobre</Link>
                    </li>
                    <li className={styles.list}>
                        <Link href='/telaCliente'>Cadastro Cliente</Link>
                    </li>
                    <li className={styles.list}>
                        <Link href='/telaLogin'>Login</Link>
                    </li>
                    <li className={styles.list}>
                        <p className={styles.nada} onClick={abrirCoisa}>Serviço</p>
                        {abrir && <div>
                            <button><Link href='#'>Criar Ficha Animal</Link></button>
                            <button><Link href='#'>Tela de Adoção</Link></button>
                            <button><Link href='#'>Conta</Link></button>
                            </div>}
                    </li>
                </ul>
            </nav>
            <div>
                <Image className={styles.img} width={70} height={70} src="/images/noIcon.png" alt='F4'/>
            </div>
        </header>
    );
}