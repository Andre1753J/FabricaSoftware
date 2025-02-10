"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";


export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image className={styles.img} width={80} height={80} src="/images/Logo Pet shop roxo.png" alt='logo Pets World'/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.lit}>
                        <Link href='/'>Holmes</Link>
                    </li>
                    <li className={styles.lit}>
                        <Link href='/sobre'>Sobre</Link>
                    </li>
                    <li className={styles.lit}>
                        <Link href='/telaCliente'>Cadastro Cliente</Link>
                    </li>
                    <li className={styles.lit}>
                        <Link href='/sobre nos'>Sobre Nós</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Image className={styles.img} width={70} height={70} src="/images/noIcon.png" alt='F4'/>
            </div>
        </header>
    );
}