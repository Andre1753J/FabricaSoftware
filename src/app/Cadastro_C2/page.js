"use client";
import { Suspense } from 'react';
import RotaSegura from '@/components/rotaSegura';
import { useState, useEffect } from "react";
import styles from '../Cadastro_A/cadastro_A.module.css';
import { API_ROUTES } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import cep from 'cep-promise';

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

function FichaClienteConteudo() {
    const searchParams = useSearchParams();
    const keyFromUrl = searchParams.get("key");
    const key = keyFromUrl || (typeof window !== "undefined" ? localStorage.getItem("clienteKey") : null);

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
        cidade: "",
        endereco: "",
    });
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);
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

    useEffect(() => {
        const cepOnlyNumbers = form.cep.replace(/\D/g, '');

        if (cepOnlyNumbers.length === 8) {
            setCepLoading(true);
            setErro("");
            cep(cepOnlyNumbers)
                .then(result => {
                    setForm(prev => ({
                        ...prev,
                        endereco: result.street,
                        bairro: result.neighborhood,
                        cidade: result.city,
                        estado: result.state,
                    }));
                })
                .catch(err => {
                    setErro(err.message || "CEP não encontrado ou inválido.");
                    setForm(prev => ({ ...prev, endereco: "", bairro: "", cidade: "", estado: "" }));
                })
                .finally(() => setCepLoading(false));
        }
    }, [form.cep]);

    function validarCampos() {
        // TODO: RG é opcional apenas para desenvolvimento. Reativar a obrigatoriedade.
        // Campos obrigatórios
        const obrigatorios = [
            "nome", "cpf", "cep", "dt_nascimento", "telefone",
            "sexo", "bairro", "estado", "cidade", "endereco"
        ];
        for (const campo of obrigatorios) {
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
        if (form.telefone2 && !/^\d{10,11}$/.test(form.telefone2)) {
            setErro("Telefone 2 deve ter 10 ou 11 dígitos numéricos.");
            return false;
        }
        // Valida RG apenas se preenchido
        if (form.rg && !/^\d{7,14}$/.test(form.rg)) {
            setErro("RG (se preenchido) deve ter entre 7 e 14 dígitos numéricos.");
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
            const dados = {
                ...form,
                complemento: form.complemento ? form.complemento : null,
                telefone2: form.telefone2 ? form.telefone2 : null,
                rg: form.rg ? form.rg : null, // Envia null se o RG estiver vazio
            };
            const resp = await fetch(API_ROUTES.cadastrarClientePt2(key), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });
            if (resp.ok) {
                setSucesso("Cadastro finalizado com sucesso! Redirecionando...");
                setTimeout(() => router.push('/pagInfo'), 2000); // Redireciona após 2 segundos
            } else {
                const data = await resp.json();
                setErro(data.response || data.message || "Erro ao cadastrar.");
            }
        } catch (error) {
            console.error("Falha na requisição:", error);
            setErro("Erro de conexão com o servidor. Verifique o console para mais detalhes.");
        }
        setLoading(false);
    }

    return (
        <RotaSegura>
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
                            {cepLoading && <div style={{ color: "#007bff", marginTop: '5px', fontSize: '14px' }}>Buscando CEP...</div>}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="complemento">COMPLEMENTO</label>
                            <input
                                className={styles.input}
                                id="complemento"
                                value={form.complemento}
                                onChange={handleChange}
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
                                type="tel"
                                inputMode="tel"
                                pattern="\d{10,11}"
                                maxLength={11}
                                placeholder="Apenas números"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="rg">RG (Opcional para dev)</label>
                            <input
                                className={styles.input}
                                id="rg"
                                value={form.rg}
                                onChange={handleChange}
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
                            <label className={styles.label} htmlFor="cidade">CIDADE</label>
                            <input
                                className={styles.input}
                                id="cidade"
                                value={form.cidade}
                                onChange={handleChange}
                                required
                                type="text"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="endereco">ENDEREÇO</label>
                            <input
                                className={styles.input}
                                id="endereco"
                                value={form.endereco}
                                onChange={handleChange}
                                required
                                type="text"
                            />
                        </div>
                        {erro && <div style={{ color: "red" }}>{erro}</div>}
                        {sucesso && <div style={{ color: "green" }}>{sucesso}</div>}
                        <button className={styles.button} type="submit" disabled={loading || cepLoading}>
                            {loading ? "Enviando..." : "Salvar"}
                        </button>
                    </form>
                </main>
            </section>
        </RotaSegura>
    );
}

export default function FichaCliente() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FichaClienteConteudo/>
        </Suspense>
    );
}