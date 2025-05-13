"use client"

import { useState } from 'react';
import styles from './cadastro_A.module.css';

export default function FichaAnimal() {
    const [formData, setFormData] = useState({
        nome: '',
        raca: '',
        idade: '',
        vacinas: '',
        mae: '',
        pai: '',
        situacao: '',
        ultimoVermifugo: '',
        sexo: '',
        especie: '',
        imagem: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagem: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>FICHA ANIMAL</h1>

                <div className={styles.title_image_main}>
                    <label className={styles.title_image}>Foto do Animal</label>
                </div>

                <div className={styles.box_image}>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={styles.button_img}
                            type="file"
                            id="img"
                            name="imagem"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </form>
                </div>

                <div className={styles.image_button_main}>
                    <input className={styles.image_button} type="submit" value="Enviar Imagem" />
                </div>

                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="nome">Nome</label>
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
                            <label className={styles.label} htmlFor="raca">Raça</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="raca"
                                name="raca"
                                placeholder="Raça do animal"
                                value={formData.raca}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="idade">Data de nascimento</label>
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

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="vacinas">Vacinas Importantes</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="vacinas"
                                name="vacinas"
                                placeholder="Vacinas Importantes que o animal tomou"
                                value={formData.vacinas}
                                onChange={handleChange}
                            />
                        </div>
                    </form>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="mae">Mãe</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="mae"
                                name="mae"
                                placeholder="Mãe do animal"
                                value={formData.mae}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="pai">Pai</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="pai"
                                name="pai"
                                placeholder="Pai do animal"
                                value={formData.pai}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="situacao">Situação</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="situacao"
                                name="situacao"
                                placeholder="Situação do animal"
                                value={formData.situacao}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="ultimoVermifugo">Último Vermífugo</label>
                            <input
                                className={styles.input}
                                type="date"
                                id="ultimoVermifugo"
                                name="ultimoVermifugo"
                                value={formData.ultimoVermifugo}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>

                <div className={styles.checkboxGroup}>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Sexo</legend>
                        <div className={styles.checkboxItem}>
                            <input
                                type="radio"
                                name="sexo"
                                id="macho"
                                value="macho"
                                onChange={handleChange}
                                checked={formData.sexo === 'macho'}
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
                            />
                            <label className={styles.label} htmlFor="femea">Fêmea</label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Espécie</legend>
                        <div className={styles.checkboxItem}>
                            <input
                                type="radio"
                                name="especie"
                                id="felino"
                                value="felino"
                                onChange={handleChange}
                                checked={formData.especie === 'felino'}
                            />
                            <label className={styles.label} htmlFor="felino">Felino</label>
                        </div>
                        <div className={styles.checkboxItem}>
                            <input
                                type="radio"
                                name="especie"
                                id="canino"
                                value="canino"
                                onChange={handleChange}
                                checked={formData.especie === 'canino'}
                            />
                            <label className={styles.label} htmlFor="canino">Canino</label>
                        </div>
                    </fieldset>
                </div>

                <button className={styles.button} onClick={handleSubmit}>Salvar</button>
            </main>
        </section>
    );
}
