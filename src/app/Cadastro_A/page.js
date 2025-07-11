"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from './cadastro_A.module.css';
import { API_ROUTES } from '@/lib/api';

// --- DADOS ESTÁTICOS PARA O FORMULÁRIO ---
// No futuro, buscar estes dados da API
const especies = [
  { idEspecie: 1, nome: 'Cachorro' },
  { idEspecie: 2, nome: 'Gato' },
];

const racasPorEspecie = {
  1: [ // Raças para Cachorro (idEspecie: 1)
    { idRaca: 1, nome: 'Sem Raça Definida (SRD)' }, { idRaca: 2, nome: 'Labrador' },
    { idRaca: 3, nome: 'Golden Retriever' }, { idRaca: 4, nome: 'Bulldog' },
    { idRaca: 5, nome: 'Poodle' },
  ],
  2: [ // Raças para Gato (idEspecie: 2)
    { idRaca: 6, nome: 'Sem Raça Definida (SRD)' }, { idRaca: 7, nome: 'Siamês' },
    { idRaca: 8, nome: 'Persa' }, { idRaca: 9, nome: 'Maine Coon' },
  ],
};

const cores = [
  { idCor: 1, nome: 'Preto' }, { idCor: 2, nome: 'Branco' },
  { idCor: 3, nome: 'Marrom' }, { idCor: 4, nome: 'Caramelo' },
  { idCor: 5, nome: 'Cinza' }, { idCor: 6, nome: 'Mesclado' },
];

const portes = [
  { idPorte: 1, nome: 'Pequeno' }, { idPorte: 2, nome: 'Médio' }, { idPorte: 3, nome: 'Grande' },
];
// --- FIM DOS DADOS ESTÁTICOS ---

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
    const [racasDisponiveis, setRacasDisponiveis] = useState([]);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [verificandoAuth, setVerificandoAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const key = localStorage.getItem("clienteKey");
        if (!key) {
            router.replace("/telaLogin");
        } else {
            setVerificandoAuth(false);
        }
    }, [router]);

    useEffect(() => {
        setRacasDisponiveis(racasPorEspecie[formData.idEspecie] || []);
        setFormData(prev => ({ ...prev, idRaca: '' })); // Reseta a raça ao trocar de espécie
    }, [formData.idEspecie]);

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
            "nome", "dataNascimento", "sexo",
            "idEspecie", "idRaca", "idCor", "idPorte"
        ];
        for (let campo of obrigatorios) {
            if (!formData[campo]) {
                setErro(`O campo '${campo}' é obrigatório.`);
                return false;
            }
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
                dt_nascimento: formData.dataNascimento,
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

            const resp = await fetch(API_ROUTES.cadastrarAnimal(key), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(animalData),
            });

            const respData = await resp.json();
            if (!resp.ok) {
                throw new Error(respData.response || "Erro ao cadastrar o animal.");
            }

            const idAnimal = respData.id;
            if (!idAnimal) {
                throw new Error("ID do animal não foi retornado pelo backend.");
            }

            const imgData = new FormData();
            imgData.append("imagem", formData.imagem);

            const uploadUrl = API_ROUTES.uploadImagem(key, TYPE_ANIMAL, idAnimal);
            const imgResp = await fetch(uploadUrl, {
                method: "POST",
                body: imgData,
            });

            if (!imgResp.ok) {
                const imgResult = await imgResp.json();
                throw new Error(imgResult.response || "Erro ao enviar a imagem do animal.");
            }

            router.push("/pagInfo");
        } catch (err) {
            setErro(err.message || "Erro de conexão com o servidor.");
            console.error("Erro no cadastro:", err);
        } finally {
            setLoading(false);
        }
    };

    if (verificandoAuth) return null;

    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>Cadastro de Animal</h1>
                <form onSubmit={handleSubmit}>
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
                        <div className={styles.radioContainer}>
                            <label><input type="radio" name="sexo" value="M" checked={formData.sexo === 'M'} onChange={handleChange} /> Macho</label>
                            <label><input type="radio" name="sexo" value="F" checked={formData.sexo === 'F'} onChange={handleChange} /> Fêmea</label>
                        </div>
                    </fieldset>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="descricao">Descrição *</label>
                        <textarea className={styles.input} name="descricao" value={formData.descricao} onChange={handleChange} required />
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label><input type="checkbox" name="castrado" checked={formData.castrado} onChange={handleChange} /> Castrado</label>
                        <label><input type="checkbox" name="vacinado" checked={formData.vacinado} onChange={handleChange} /> Vacinado</label>
                        <label><input type="checkbox" name="vermifugado" checked={formData.vermifugado} onChange={handleChange} /> Vermifugado</label>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Espécie *</label>
                        <select className={styles.input} name="idEspecie" value={formData.idEspecie} onChange={handleChange} required>
                            <option value="">Selecione a espécie</option>
                            {especies.map(e => (
                                <option key={e.idEspecie} value={e.idEspecie}>{e.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Raça *</label>
                        <select className={styles.input} name="idRaca" value={formData.idRaca} onChange={handleChange} required disabled={!formData.idEspecie}>
                            <option value="">Selecione a raça</option>
                            {racasDisponiveis.map(r => (
                                <option key={r.idRaca} value={r.idRaca}>{r.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cor *</label>
                        <select className={styles.input} name="idCor" value={formData.idCor} onChange={handleChange} required>
                            <option value="">Selecione a cor</option>
                            {cores.map(c => (
                                <option key={c.idCor} value={c.idCor}>{c.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Porte *</label>
                        <select className={styles.input} name="idPorte" value={formData.idPorte} onChange={handleChange} required>
                            <option value="">Selecione o porte</option>
                            {portes.map(p => (
                                <option key={p.idPorte} value={p.idPorte}>{p.nome}</option>
                            ))}
                        </select>
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
