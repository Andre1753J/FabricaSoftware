"use client";

import { useState } from 'react';
import styles from '../Cadastro_A/cadastro_A.module.css';
import Link from 'next/link';

export default function FichaCliente() {
    // State para armazenar as informações dos campos
    const [animalData, setAnimalData] = useState({
        nome: '',
        estado_civil: '',
        dt_nasimento: '',
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
                <h1 className={styles.title}>FICHA CLIENTE</h1>
                
                <div className={styles.title_image_main}>
                    <label className={styles.title_image}>Foto do Cliente</label>
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
                                placeholder="Nome do Cliente" 
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="raca">CPF</label>
                            <input 
                                className={styles.input} 
                                type="number" 
                                id="cpf" 
                                value={animalData.raca} 
                                onChange={handleChange} 
                                placeholder="Estado Civil" 
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="idade">Data de nascimento</label>
                            <input 
                                className={styles.input} 
                                type="date" 
                                id="dt_nasimento" 
                                value={animalData.idade} 
                                onChange={handleChange} 
                                placeholder="Data de nascimento" 
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="situacao">Endereço</label>
                            <input 
                                className={styles.input} 
                                type="address" 
                                id="situacao" 
                                value={animalData.situacao} 
                                onChange={handleChange} 
                                placeholder="Endereço do Cliente" 
                            />
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        {/* Formulário 2 */}
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="mae">Bairro</label>
                            <input 
                                className={styles.input} 
                                type="address" 
                                id="bairro" 
                                value={animalData.mae} 
                                onChange={handleChange} 
                                placeholder="Bairro do cliente" 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="pai">Telefone</label>
                            <input 
                                className={styles.input} 
                                type="number" 
                                id="fone" 
                                value={animalData.pai} 
                                onChange={handleChange} 
                                placeholder="Telefone do cliente" 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="situacao">Profissão</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="profissão" 
                                value={animalData.situacao} 
                                onChange={handleChange} 
                                placeholder="Profissão do Cliente" 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="verme">E-mail</label>
                            <input 
                                className={styles.input} 
                                type="email" 
                                id="email" 
                               value={animalData.ultimoVerme} 
                                onChange={handleChange} 
                                placeholder="E-mail do Cliente"
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
                                    value="Masculino" 
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
                                    value="Femenino" 
                                    onChange={handleChange} 
                                    checked={animalData.sexo === 'Fêmea'} 
                                />
                                <label className={styles.label} htmlFor="femea">Fêmea</label>
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
