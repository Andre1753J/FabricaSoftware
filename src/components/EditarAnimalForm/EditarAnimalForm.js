'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_ROUTES } from '../../lib/api';
import styles from './EditarAnimalForm.module.css';

export default function EditarAnimalForm({ animal, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        nome: animal.nome || '',
        especie: animal.especie || '',
        sexo: animal.sexo || '',
        idade: animal.idade || '',
        porte: animal.porte || '',
        sobre: animal.sobre || '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const key = Cookies.get('user_key');
        if (!key) {
            alert('Sessão expirada. Faça login novamente.');
            router.push('/login');
            return;
        }

        try {
            const response = await fetch(API_ROUTES.editarAnimal(key, animal.id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao atualizar o animal.');
            }

            alert('Animal atualizado com sucesso!');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            alert(`Erro: ${err.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Editar Informações de {animal.nome}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}><label htmlFor="nome">Nome</label><input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required /></div>
                <div className={styles.formGroup}><label htmlFor="especie">Espécie</label><input type="text" id="especie" name="especie" value={formData.especie} onChange={handleChange} required /></div>
                <div className={styles.formGroup}><label htmlFor="sexo">Sexo</label><select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required><option value="">Selecione</option><option value="Macho">Macho</option><option value="Fêmea">Fêmea</option></select></div>
                <div className={styles.formGroup}><label htmlFor="idade">Idade</label><input type="text" id="idade" name="idade" value={formData.idade} onChange={handleChange} required /></div>
                <div className={styles.formGroup}><label htmlFor="porte">Porte</label><select id="porte" name="porte" value={formData.porte} onChange={handleChange} required><option value="">Selecione</option><option value="Pequeno">Pequeno</option><option value="Médio">Médio</option><option value="Grande">Grande</option></select></div>
                <div className={styles.formGroup}><label htmlFor="sobre">Sobre</label><textarea id="sobre" name="sobre" value={formData.sobre} onChange={handleChange} rows="4"></textarea></div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancelar</button>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Salvar Alterações</button>
                </div>
            </form>
        </div>
    );
}
