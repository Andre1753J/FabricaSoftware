'use client';

import styles from './telaLogin.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function TelaLogin() {
    const router = useRouter();
    const { login } = useAuth();
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        const email = e.target.email.value;
        const senha = e.target.password.value;

        if (!email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }
        if (senha.length < 8) {
            setErro("A senha deve ter pelo menos 8 dígitos.");
            return;
        }

        try {
            const resp = await fetch("https://petsworldapi.dev.vilhena.ifro.edu.br/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            const data = await resp.json();
            console.log("Resposta da API de login (para depuração):", data);

            // A API de login retorna um objeto JSON, como { data: { key: "..." } }.
            // O erro "[object Object]" acontecia ao tentar salvar o objeto 'data' inteiro.
            // Precisamos salvar apenas a string da chave, que está em 'data.data.key'.
            if (resp.ok && data && data.data && data.data.key) {
                login(data.data.key); // Usa a função do contexto para fazer login
                router.push('/pagInfo');
            } else {
                // A mensagem de erro também vem no objeto JSON
                const errorMessage = (data && (data.message || data.error)) || "Email ou senha inválidos.";
                setErro(errorMessage);
            }
        } catch {
            setErro("Erro de conexão com o servidor.");
        }
    };

    return (
        <div className={styles.div_pai}>
            <main className={styles.main}>
                <h1 className={styles.card_titulo}>Login do Usuário</h1>
                <form className={styles.card_form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.email} htmlFor="email">E-mail</label>
                        <input 
                            className={styles.inpt_email} 
                            id="email" 
                            name="email" 
                            placeholder="Digite seu endereço de email" 
                            type="email" 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.pass} htmlFor="password">Senha</label>
                        <input 
                            className={styles.inptpass} 
                            id="password" 
                            name="password" 
                            placeholder="Digite sua senha" 
                            type="password" 
                            minLength={8}
                            required 
                        />
                    </div>
                    {erro && <div style={{ color: "red" }}>{erro}</div>}
                    <button className={styles.button} type="submit">Continuar</button>
                </form>
                <p className={styles.card_texto}>
                    Não tem cadastro?
                    <Link href="/Cadastro_C" className={styles.card_cada}> Cadastra-se </Link>
                </p>
            </main>
        </div>
    );
}