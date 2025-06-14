"use client";
import { useState } from "react";
import styles from '../Cadastro_A/cadastro_A.module.css';
import { API_ROUTES } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

// Função para formatar o CPF enquanto digita
function formatarCPF(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
}

// Função para formatar o CEP enquanto digita
function formatarCEP(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 8);
    if (valor.length > 5) {
        valor = valor.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
    return valor;
}

export default function FichaCliente() {
    // Se precisar do key/token, descomente as linhas abaixo:
    // const searchParams = useSearchParams();
    // const key = searchParams.get("key");

    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        cep: "",
        complemento: "",
        dt_nascimento: "",
        telefone: "",
        telefone2: "",
        rg: "",
        sexo: "",
        bairro: "",
        estado: "",
        rua: "",
    });
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleChange(e) {
        const { id, value } = e.target;
        let newValue = value;

        if (id === "cpf") {
            newValue = formatarCPF(newValue);
        } else if (id === "cep") {
            newValue = formatarCEP(newValue);
        } else if (["telefone", "telefone2", "rg"].includes(id)) {
            newValue = newValue.replace(/\D/g, "");
        }

        setForm({ ...form, [id]: newValue });
        setErro("");
        setSucesso("");
    }

    function validarCampos() {
        for (const campo in form) {
            if (!form[campo]) {
                setErro(`Preencha o campo: ${campo}`);
                return false;
            }
        }
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
            setErro("CPF deve estar no formato 000.000.000-00.");
            return false;
        }
        if (!/^\d{5}-\d{3}$/.test(form.cep)) {
            setErro("CEP deve estar no formato 00000-000.");
            return false;
        }
        if (!/^\d{10,11}$/.test(form.telefone)) {
            setErro("Telefone deve ter 10 ou 11 dígitos numéricos.");
            return false;
        }
        if (!/^\d{10,11}$/.test(form.telefone2)) {
            setErro("Telefone 2 deve ter 10 ou 11 dígitos numéricos.");
            return false;
        }
        if (!/^\d{7,14}$/.test(form.rg)) {
            setErro("RG deve ter entre 7 e 14 dígitos numéricos.");
            return false;
        }
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validarCampos()) return;
        setLoading(true);
        setErro("");
        setSucesso("");
        try {
            // Troque "key" pela variável correta se necessário
            // const resp = await fetch(API_ROUTES.cadastrarClientePt2(key), {
            const resp = await fetch(API_ROUTES.cadastrarClientePt2("key"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (resp.ok) {
                setSucesso("Cadastro finalizado com sucesso!");
                setForm({
                    nome: "",
                    cpf: "",
                    cep: "",
                    complemento: "",
                    dt_nascimento: "",
                    telefone: "",
                    telefone2: "",
                    rg: "",
                    sexo: "",
                    bairro: "",
                    estado: "",
                    rua: "",
                });
                // router.push("/alguma_pagina");
            } else {
                const data = await resp.json();
                setErro(data.message || "Erro ao cadastrar.");
            }
        } catch {
            setErro("Erro de conexão com o servidor.");
        }
        setLoading(false);
    }

    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>FICHA CLIENTE</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="nome">NOME</label>
                        <input
                            className={styles.input}
                            id="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                            type="text"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="cpf">CPF</label>
                        <input
                            className={styles.input}
                            id="cpf"
                            value={form.cpf}
                            onChange={handleChange}
                            required
                            type="text"
                            inputMode="numeric"
                            maxLength={14}
                            placeholder="000.000.000-00"
                            title="Digite o CPF no formato 000.000.000-00"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="cep">CEP</label>
                        <input
                            className={styles.input}
                            id="cep"
                            value={form.cep}
                            onChange={handleChange}
                            required
                            type="text"
                            inputMode="numeric"
                            maxLength={9}
                            placeholder="00000-000"
                            title="Digite o CEP no formato 00000-000"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="complemento">COMPLEMENTO</label>
                        <input
                            className={styles.input}
                            id="complemento"
                            value={form.complemento}
                            onChange={handleChange}
                            required
                            type="text"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="dt_nascimento">DATA DE NASCIMENTO</label>
                        <input
                            className={styles.input}
                            id="dt_nascimento"
                            value={form.dt_nascimento}
                            onChange={handleChange}
                            required
                            type="date"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="telefone">TELEFONE</label>
                        <input
                            className={styles.input}
                            id="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            required
                            type="tel"
                            inputMode="tel"
                            pattern="\d{10,11}"
                            maxLength={11}
                            placeholder="Apenas números"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="telefone2">TELEFONE 2</label>
                        <input
                            className={styles.input}
                            id="telefone2"
                            value={form.telefone2}
                            onChange={handleChange}
                            required
                            type="tel"
                            inputMode="tel"
                            pattern="\d{10,11}"
                            maxLength={11}
                            placeholder="Apenas números"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rg">RG</label>
                        <input
                            className={styles.input}
                            id="rg"
                            value={form.rg}
                            onChange={handleChange}
                            required
                            type="text"
                            inputMode="numeric"
                            pattern="\d{7,14}"
                            maxLength={14}
                            placeholder="Apenas números"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="sexo">SEXO</label>
                        <select
                            className={styles.input}
                            id="sexo"
                            value={form.sexo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="bairro">BAIRRO</label>
                        <input
                            className={styles.input}
                            id="bairro"
                            value={form.bairro}
                            onChange={handleChange}
                            required
                            type="text"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="estado">ESTADO</label>
                        <input
                            className={styles.input}
                            id="estado"
                            value={form.estado}
                            onChange={handleChange}
                            required
                            type="text"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="rua">RUA</label>
                        <input
                            className={styles.input}
                            id="rua"
                            value={form.rua}
                            onChange={handleChange}
                            required
                            type="text"
                        />
                    </div>
                    {erro && <div style={{ color: "red" }}>{erro}</div>}
                    {sucesso && <div style={{ color: "green" }}>{sucesso}</div>}
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Salvar"}
                    </button>
                </form>
            </main>
        </section>
    );
}