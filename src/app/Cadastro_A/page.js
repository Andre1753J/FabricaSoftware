"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from './cadastro_A.module.css';

const API_BASE_URL = "https://petsworldapi.dev.vilhena.ifro.edu.br";
const TYPE_ANIMAL = 2;

export default function FichaAnimal() {
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        sexo: '',
        imagem: null,
        descricao: '',
        castrado: false,
        vacinado: false,
        vermifugado: false,
        idEspecie: '',
        idRaca: '',
        idCor: '',
        idPorte: ''
    });
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [verificandoAuth, setVerificandoAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const key = localStorage.getItem("clienteKey");
        if (!key) {
            router.push("/telaLogin");
        } else {
            setVerificandoAuth(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: val });
        setErro("");
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagem: e.target.files[0] });
        setErro("");
    };

    function validarCampos() {
        const obrigatorios = [
            "nome", "dataNascimento", "sexo", "descricao",
            "idEspecie", "idRaca", "idCor", "idPorte"
        ];
        for (let campo of obrigatorios) {
            if (!formData[campo]) return setErro(`Preencha o campo: ${campo}`);
        }
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
                data_nascimento: formData.dataNascimento,
                sexo: formData.sexo,
                disponivel: 1,
                descricao: formData.descricao,
                castrado: formData.castrado ? 1 : 0,
                vacinado: formData.vacinado ? 1 : 0,
                vermifugado: formData.vermifugado ? 1 : 0,
                idEspecie: parseInt(formData.idEspecie),
                idRaca: parseInt(formData.idRaca),
                idCor: parseInt(formData.idCor),
                idPorte: parseInt(formData.idPorte),
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

    if (verificandoAuth) return null;

    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>Cadastro de Animal</h1>
                <form onSubmit={handleSubmit} className={styles.formFull}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="nome">Nome *</label>
                        <input className={styles.input} type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="dataNascimento">Data de nascimento *</label>
                        <input className={styles.input} type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                    </div>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Sexo *</legend>
                        <label><input type="radio" name="sexo" value="M" checked={formData.sexo === 'M'} onChange={handleChange} /> Macho</label>
                        <label><input type="radio" name="sexo" value="F" checked={formData.sexo === 'F'} onChange={handleChange} /> Fêmea</label>
                    </fieldset>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="descricao">Descrição *</label>
                        <textarea className={styles.input} name="descricao" value={formData.descricao} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label><input type="checkbox" name="castrado" checked={formData.castrado} onChange={handleChange} /> Castrado</label>
                        <label><input type="checkbox" name="vacinado" checked={formData.vacinado} onChange={handleChange} /> Vacinado</label>
                        <label><input type="checkbox" name="vermifugado" checked={formData.vermifugado} onChange={handleChange} /> Vermifugado</label>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Espécie ID *</label>
                        <input className={styles.input} type="number" name="idEspecie" value={formData.idEspecie} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Raça ID *</label>
                        <input className={styles.input} type="number" name="idRaca" value={formData.idRaca} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Cor ID *</label>
                        <input className={styles.input} type="number" name="idCor" value={formData.idCor} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Porte ID *</label>
                        <input className={styles.input} type="number" name="idPorte" value={formData.idPorte} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="imagem">Foto do Animal *</label>
                        <input className={styles.input} type="file" name="imagem" accept="image/*" onChange={handleFileChange} required />
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
