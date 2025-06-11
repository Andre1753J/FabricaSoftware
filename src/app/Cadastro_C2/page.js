"use client";

import { useState } from 'react';
import styles from '../Cadastro_A/cadastro_A.module.css';

export default function FichaCliente() {
    const [clienteData, setClienteData] = useState({
        nome: '',
        dt_nascimento: '',
        sexo: '',
        cpf: '',
        rg: '',
        telefone_1: '',
        telefone_2: '',
        rua: '',
        bairro: '',
        complemento: '',
        estado: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setClienteData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(clienteData);
        // Aqui você pode redirecionar com useRouter(), se quiser
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
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="nome">Nome</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="nome"
                                value={clienteData.nome}
                                onChange={handleChange}
                                placeholder="Nome do Cliente"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="dt_nascimento">Data de Nascimento</label>
                            <input
                                className={styles.input}
                                type="date"
                                id="dt_nascimento"
                                value={clienteData.dt_nascimento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="cpf">CPF</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="cpf"
                                value={clienteData.cpf}
                                onChange={handleChange}
                                placeholder="CPF do cliente"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="rg">RG</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="rg"
                                value={clienteData.rg}
                                onChange={handleChange}
                                placeholder="RG do cliente"
                            />
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="telefone_1">Telefone 1</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="telefone_1"
                                value={clienteData.telefone_1}
                                onChange={handleChange}
                                placeholder="Telefone do cliente"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="telefone_2">Telefone 2</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="telefone_2"
                                value={clienteData.telefone_2}
                                onChange={handleChange}
                                placeholder="Telefone do cliente"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="rua">Rua</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="rua"
                                value={clienteData.rua}
                                onChange={handleChange}
                                placeholder="Rua do Cliente"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="bairro">Bairro</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="bairro"
                                value={clienteData.bairro}
                                onChange={handleChange}
                                placeholder="Bairro do cliente"
                            />
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="complemento">Complemento</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="complemento"
                                value={clienteData.complemento}
                                onChange={handleChange}
                                placeholder="Complemento do Local"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="estado">Estado</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="estado"
                                value={clienteData.estado}
                                onChange={handleChange}
                                placeholder="Estado onde o cliente mora"
                            />
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Sexo</legend>

                            <div className={styles.checkboxItem}>
                                <input
                                    type="radio"
                                    name="sexo"
                                    id="sexo"
                                    value="Masculino"
                                    onChange={handleChange}
                                    checked={clienteData.sexo === 'Masculino'}
                                />
                                <label className={styles.label} htmlFor="sexo">Masculino</label>
                            </div>

                            <div className={styles.checkboxItem}>
                                <input
                                    type="radio"
                                    name="sexo"
                                    id="sexo"
                                    value="Feminino"
                                    onChange={handleChange}
                                    checked={clienteData.sexo === 'Feminino'}
                                />
                                <label className={styles.label} htmlFor="sexo">Feminino</label>
                            </div>
                        </fieldset>
                    </div>


                    <button className={styles.button} type="submit">
                        Salvar
                    </button>
                </form>
            </main>
        </section>
    );
}


// não tem porque pegar o e email denovo se ja ta castrado
// não faz sentido pegar a profissão do cliente
// não se utiliza "macho" e "fêmea" como opções de sexo, mas sim "masculino" e "feminino"
// há inumeras desconexões com o back
// colque todas as informações do cliente corretamente
// as informações do cliente estão no .txt isso são apenas orientações