"use client";

import { useState } from 'react';
import styles from '../Cadastro_A/cadastro_A.module.css';
import Link from 'next/link';

export default function FichaAnimal() {
    // State para armazenar as informações dos campos
    const [animalData, setAnimalData] = useState({
        nome: '',
        raca: '',
        idade: '',
        situacao: '',
        mae: '',
        pai: '',
        ultimoVerme: '',
        sexo: '',
        especie: ''
    });

    // Função para atualizar os dados do formulário
    const handleChange = (e) => {
        const { id, value } = e.target;
        setAnimalData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para a API ou processá-los conforme necessário
        console.log(animalData);
    };

    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>FICHA ANIMAL</h1>
                
                <div className={styles.title_image_main}>
                    <label className={styles.title_image}>Foto do Animal</label>
                </div>
                
                <div className={styles.box_image}>
                    <form>
                        <input 
                            className={styles.button_img} 
                            type="file" 
                            id="img" 
                            name="img" 
                            accept="image/*" 
                        />
                    </form>
                </div>

                <div className={styles.image_button_main}>
                    <input className={styles.image_button} type="submit" />
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        {/* Formulário 1 */}
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="nome">Nome</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="nome" 
                                value={animalData.nome} 
                                onChange={handleChange} 
                                placeholder="Nome do animal" 
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="raca">Raça</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="raca" 
                                value={animalData.raca} 
                                onChange={handleChange} 
                                placeholder="Raça do animal" 
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="idade">Data de nascimento</label>
                            <input 
                                className={styles.input} 
                                type="date" 
                                id="idade" 
                                value={animalData.idade} 
                                onChange={handleChange} 
                                placeholder="Data de nascimento" 
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="situacao">Vacinas Importantes</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="situacao" 
                                value={animalData.situacao} 
                                onChange={handleChange} 
                                placeholder="Vacinas importantes" 
                            />
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        {/* Formulário 2 */}
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="mae">Mãe</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="mae" 
                                value={animalData.mae} 
                                onChange={handleChange} 
                                placeholder="Mãe do animal" 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="pai">Pai</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="pai" 
                                value={animalData.pai} 
                                onChange={handleChange} 
                                placeholder="Pai do animal" 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="situacao">Situação</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="situacao" 
                                value={animalData.situacao} 
                                onChange={handleChange} 
                                placeholder="Situação do animal" 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="verme">Último Vermífugo</label>
                            <input 
                                className={styles.input} 
                                type="date" 
                                id="verme" 
                                value={animalData.ultimoVerme} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    {/* Seleção de Sexo e Espécie */}
                    <div className={styles.checkboxGroup}>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Sexo</legend>
                            <div className={styles.checkboxItem}>
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="macho" 
                                    value="Macho" 
                                    onChange={handleChange} 
                                    checked={animalData.sexo === 'Macho'} 
                                />
                                <label className={styles.label} htmlFor="macho">Macho</label>
                            </div>
                            <div className={styles.checkboxItem}>
                                <input 
                                    type="radio" 
                                    name="sexo" 
                                    id="femea" 
                                    value="Fêmea" 
                                    onChange={handleChange} 
                                    checked={animalData.sexo === 'Fêmea'} 
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
                                    value="Felino" 
                                    onChange={handleChange} 
                                    checked={animalData.especie === 'Felino'} 
                                />
                                <label className={styles.label} htmlFor="felino">Felino</label>
                            </div>
                            <div className={styles.checkboxItem}>
                                <input 
                                    type="radio" 
                                    name="especie" 
                                    id="canino" 
                                    value="Canino" 
                                    onChange={handleChange} 
                                    checked={animalData.especie === 'Canino'} 
                                />
                                <label className={styles.label} htmlFor="canino">Canino</label>
                            </div>
                        </fieldset>
                    </div>

                    {/* Botão de Salvar */}
                    <Link href='/pagInfo'>
                        <button className={styles.button} type="submit">
                            Salvar
                        </button>
                    </Link>
                </form>
            </main>
        </section>
    );
}
