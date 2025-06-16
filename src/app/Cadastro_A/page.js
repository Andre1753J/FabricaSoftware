"use client";
import RotaSegura from '@/components/rotaSegura';
import { useState } from 'react';
import styles from './cadastro_A.module.css';
import { useRouter } from "next/navigation";

export default function FichaAnimal() {
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        sexo: '',
    });
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErro("");
    };

    function validarCampos() {
        if (!formData.nome) {
            setErro("Preencha o campo: nome");
            return false;
        }
        if (!formData.idade) {
            setErro("Preencha o campo: data de nascimento");
            return false;
        }
        if (!formData.sexo) {
            setErro("Selecione o sexo");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;
        setLoading(true);
        setErro("");
        try {
            // Pegue a key do cliente logado
            const key = typeof window !== "undefined" ? localStorage.getItem("clienteKey") : null;
            if (!key) {
                setErro("Usuário não autenticado.");
                setLoading(false);
                return;
            }
            // Ajuste a rota para o endpoint correto do seu backend
            const resp = await fetch("https://petsworldapi.dev.vilhena.ifro.edu.br/cadastrar_a/" + key, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (resp.ok) {
                router.push("/Adocoes");
            } else {
                const respData = await resp.json();
                setErro(respData.message || "Erro ao cadastrar animal.");
            }
        } catch {
            setErro("Erro de conexão com o servidor.");
        }
        setLoading(false);
    };

    return (
        <RotaSegura>
            <section className={styles.section}>
                <main className={styles.main}>
                    <h1 className={styles.title}>FICHA ANIMAL</h1>
                    <form onSubmit={handleSubmit} className={styles.formFull}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="nome">Nome *</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome do animal"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="idade">Data de nascimento *</label>
                            <input
                                className={styles.input}
                                type="date"
                                id="idade"
                                name="idade"
                                value={formData.idade}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Sexo *</legend>
                            <div className={styles.checkboxItem}>
                                <input
                                    type="radio"
                                    name="sexo"
                                    id="macho"
                                    value="macho"
                                    onChange={handleChange}
                                    checked={formData.sexo === 'macho'}
                                    required
                                />
                                <label className={styles.label} htmlFor="macho">Macho</label>
                            </div>
                            <div className={styles.checkboxItem}>
                                <input
                                    type="radio"
                                    name="sexo"
                                    id="femea"
                                    value="femea"
                                    onChange={handleChange}
                                    checked={formData.sexo === 'femea'}
                                    required
                                />
                                <label className={styles.label} htmlFor="femea">Fêmea</label>
                            </div>
                        </fieldset>
                        {erro && <div style={{ color: "red" }}>{erro}</div>}
                        <button className={styles.button} type="submit" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </form>
                </main>
            </section>
        </RotaSegura>
    );
}