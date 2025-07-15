"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Importando o hook de autenticação
import styles from "./Header.module.css";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth(); // Usando o contexto
    const router = useRouter();

     const handleDropdownLinkClick = (e, href) => {
         if (!isLoggedIn && (href === "/telaConta" || href === "/meus-pedidos" || href === "/solicitacoes")) {
             e.preventDefault();
             router.push('/telaLogin');
         }
     };


    const handleLogout = () => {
        logout();
        alert("Você foi desconectado.");
    };

    return (
        <header className={styles.header}>
            <Link href="/" aria-label="Página Inicial">
                <Image className={styles.logoImage} width={80} height={80} src="/images/Logo Pet shop roxo.png" alt='Logo Pets World' />
            </Link>
            
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><Link href={isLoggedIn ? "/pagInfo" : "/"} >Início</Link></li>
                    <li><Link href='/adocao'>Adoção</Link></li>
                    <li><Link href='/sobreNos'>Sobre</Link></li>
                    <li><Link href='/telaContato'>Contato</Link></li>
                    
                    {/* Dropdown de Serviços */}
                    <li 
                        className={styles.servicoContainer}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <span className={styles.navLink}>Serviços ▼</span>
                        {isDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/Cadastro_A" className={styles.dropdownLink}>Cadastrar Animal</Link>
                                        <Link href="/telaConta" className={styles.dropdownLink} onClick={(e) => handleDropdownLinkClick(e, "/telaConta")}>
                                            Minha Conta
                                        </Link>
                                        <Link href="/meus-pedidos" className={styles.dropdownLink} onClick={(e) => handleDropdownLinkClick(e, "/meus-pedidos")}>
                                            Meus Pedidos
                                        </Link>
                                        <Link href="/solicitacoes" className={styles.dropdownLink} onClick={(e) => handleDropdownLinkClick(e, "/solicitacoes")}>
                                            Solicitações Recebidas
                                        </Link>
                                    </>


                                ) : (
                                    <div className={styles.dropdownLoginMessage}>
                                        <p>Faça login para acessar os serviços.</p>
                                        <Link href="/telaLogin" className={styles.dropdownLoginButton}>Login</Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                </ul>
            </nav>

            <div className={styles.authActions}>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className={styles.authButton}>Sair</button>
                ) : (
                        <Link href="/telaLogin" className={styles.authButton} >Login</Link>
                )}
            </div>
        </header>
    );
}
