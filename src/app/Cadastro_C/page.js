"use client";
import { useState } from "react";
import styles from './cadastro_C.module.css';
import { API_ROUTES } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Cliente() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (!email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }
        if (senha.length < 8) {
            setErro("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        setLoading(true);
        try {
            const resp = await fetch(API_ROUTES.cadastrarCliente, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            const data = await resp.json();
            if (resp.ok) {
                // CORREÇÃO: A chave vem dentro de data.data.key
                if (data.data && data.data.key) {
                    localStorage.setItem("clienteKey", data.data.key);
                    // Apenas redireciona se a chave for salva com sucesso
                    router.push(`/Cadastro_C2`);
                } else {
                    setErro("Chave de cadastro não recebida do servidor.");
                }
            } else {
                setErro(data.error || data.erro || "Erro ao cadastrar.");
            }
        } catch (error) {
            console.error("Falha na requisição de cadastro:", error);
            setErro("Erro de conexão com o servidor. Verifique o console.");
        }
        setLoading(false);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Cadastro Cliente</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">EMAIL</label>
                        <input
                            className={styles.input}
                            id="email"
                            name="email"
                            placeholder="Digite seu endereço de email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="pass">SENHA</label>
                        <input
                            className={styles.input}
                            id="pass"
                            name="pass"
                            placeholder="Digite a senha para ser cadastrada"
                            type="password"
                            minLength={8}
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    {erro && <div style={{ color: "red" }}>{erro}</div>}
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Enviando..." : "Continuar"}
                    </button>
                </form>
            </div>
        </section>
    );
}