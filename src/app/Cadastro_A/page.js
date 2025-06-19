"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from './cadastro_A.module.css';

const API_BASE_URL = "https://petsworldapi.dev.vilhena.ifro.edu.br";
const TYPE_ANIMAL = 2;

export default function FichaAnimal() {
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        dataNascimento: '',
        sexo: '',
        imagem: null,
    });
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [verificandoAuth, setVerificandoAuth] = useState(true);
    const router = useRouter();

    // Redireciona se não estiver logado
    useEffect(() => {
        const key = localStorage.getItem("clienteKey");
        if (!key) {
            router.push("/telaLogin");
        } else {
            setVerificandoAuth(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErro("");
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagem: e.target.files[0] });
        setErro("");
    };

    function validarCampos() {
        if (!formData.nome) return setErro("Preencha o nome");
        if (!formData.idade) return setErro("Preencha a idade");
        if (!formData.sexo) return setErro("Selecione o sexo");
        if (!formData.imagem) return setErro("Selecione uma imagem");
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        if (!validarCampos()) return;
        setLoading(true);

        try {
            const key = localStorage.getItem("clienteKey");
            if (!key) {
                setErro("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            const animalData = {
                nome: formData.nome,
                idade: formData.idade,
                sexo: formData.sexo,
                disponivel: 1
            };

            const resp = await fetch(`${API_BASE_URL}/cadastrar_a/${key}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(animalData),
            });

            const respData = await resp.json();
            if (!resp.ok) {
                setErro(respData.response || "Erro ao cadastrar animal.");
                setLoading(false);
                return;
            }

            const idAnimal = respData.id || respData.response?.id;
            if (!idAnimal) {
                setErro("ID do animal não retornado pelo backend.");
                setLoading(false);
                return;
            }

            const imgData = new FormData();
            imgData.append("imagem", formData.imagem);

            const uploadUrl = `${API_BASE_URL}/upload/${key}/type/${TYPE_ANIMAL}/animal/${idAnimal}`;
            const imgResp = await fetch(uploadUrl, {
                method: "POST",
                body: imgData,
            });

            const imgResult = await imgResp.json();
            if (!imgResp.ok) {
                setErro(imgResult.response || "Erro ao enviar imagem.");
                setLoading(false);
                return;
            }

            router.push("/adocao");
        } catch (err) {
            setErro("Erro de conexão com o servidor.");
            console.error("Erro no cadastro:", err);
        }
        setLoading(false);
    };

    // Mostra "null" ou loading enquanto verifica login
    if (verificandoAuth) return null;

    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>Cadastro de Animal</h1>
                <form onSubmit={handleSubmit} className={styles.formFull}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="nome">Nome *</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="idade">Idade *</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="idade"
                            name="idade"
                            value={formData.idade}
                            onChange={handleChange}
                            required
                            min={0}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="dataNascimento">Data de nascimento (opcional)</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                        />
                    </div>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Sexo *</legend>
                        <div className={styles.checkboxItem}>
                            <input
                                type="radio"
                                name="sexo"
                                id="macho"
                                value="M"
                                onChange={handleChange}
                                checked={formData.sexo === 'M'}
                                required
                            />
                            <label className={styles.label} htmlFor="macho">Macho</label>
                        </div>
                        <div className={styles.checkboxItem}>
                            <input
                                type="radio"
                                name="sexo"
                                id="femea"
                                value="F"
                                onChange={handleChange}
                                checked={formData.sexo === 'F'}
                                required
                            />
                            <label className={styles.label} htmlFor="femea">Fêmea</label>
                        </div>
                    </fieldset>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="imagem">Foto do Animal *</label>
                        <input
                            className={styles.input}
                            type="file"
                            id="imagem"
                            name="imagem"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    {erro && <div style={{ color: "red" }}>{erro}</div>}
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </form>
            </main>
        </section>
    );
}
