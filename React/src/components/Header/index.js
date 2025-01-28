"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css"

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <Image
                    src="/"
                    alt="Menu Icon"
                    className={styles.menuIcon}
                    onClick={toggleMenu}
                    width={50}
                    height={50}
                />
            </div>
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.list}>
                    <li className={styles.lit}>
                        <Link href='/'>Holmes</Link>
                    </li>
                    <li className={styles.lit}>
                        <Link href='/sobre'>Sobre</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}