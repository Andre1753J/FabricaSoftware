"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useRouter } from 'next/navigation';
import styles from './MeusAnimais.module.css';

// Componente para o Modal de Edição
const EditModal = ({ animal, onClose, onSave }) => {
    const [formData, setFormData] = useState(animal);

    useEffect(() => {
        setFormData(animal);
    }, [animal]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Formata a data para o input type="date"
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Animal</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dt_nascimento">Data de Nascimento</label>
                        <input type="date" id="dt_nascimento" name="dt_nascimento" value={formatDateForInput(formData.dt_nascimento)} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Sexo</label>
                        <select name="sexo" value={formData.sexo || 'M'} onChange={handleChange}>
                            <option value="M">Macho</option>
                            <option value="F">Fêmea</option>
                        </select>
                    </div>
                    <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="disponivel" name="disponivel" checked={formData.disponivel || false} onChange={handleChange} />
                        <label htmlFor="disponivel">Disponível para Adoção</label>
                    </div>
                    {/* Adicionar outros campos do animal para edição aqui */}
                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.btnSecondary}>Cancelar</button>
                        <button type="submit" className={styles.btnPrimary}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function MeusAnimaisPage() {
    const { userKey, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const [animais, setAnimais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/telaLogin');
            return;
        }

        if (userKey) {
            const fetchAnimais = async () => {
                try {
                    setLoading(true);
                    const response = await fetch('/api/animais/meus-animais', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: userKey }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Falha ao buscar os animais.');
                    }

                    const data = await response.json();
                    setAnimais(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchAnimais();
        }
    }, [userKey, isAuthenticated, authLoading, router]);

    const handleOpenModal = (animal) => {
        setEditingAnimal(animal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAnimal(null);
    };

    const handleSave = async (updatedAnimal) => {
        try {
            const response = await fetch('/api/animais/editar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    key: userKey, 
                    animalID: updatedAnimal.id,
                    ...updatedAnimal 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Falha ao editar o animal.');
            }

            setAnimais(animais.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
            handleCloseModal();
            alert('Animal atualizado com sucesso!');
        } catch (err) {
            setError(err.message);
            alert(`Erro: ${err.message}`);
        }
    };

    const handleDelete = async (animalId) => {
        if (window.confirm('Tem certeza que deseja remover este animal? Esta ação não pode ser desfeita.')) {
            try {
                const response = await fetch('/api/animais/remover', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: userKey, animalID: animalId }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Falha ao remover o animal.');
                }
                
                setAnimais(animais.filter(a => a.id !== animalId));
                alert('Animal removido com sucesso!');
            } catch (err) {
                setError(err.message);
                alert(`Erro: ${err.message}`);
            }
        }
    };

    if (authLoading || loading) return <div className={styles.centeredMessage}>Carregando...</div>;
    if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus Animais Cadastrados</h1>
            {animais.length > 0 ? (
                <div className={styles.animalList}>
                    {animais.map(animal => (
                        <div key={animal.id} className={styles.animalCard}>
                            <h3>{animal.nome}</h3>
                            <p>Nascimento: {new Date(animal.dt_nascimento).toLocaleDateString()}</p>
                            <p>Status: {animal.disponivel ? 'Disponível' : 'Indisponível'}</p>
                            <div className={styles.cardActions}>
                                <button onClick={() => handleOpenModal(animal)} className={styles.btnEdit}>Editar</button>
                                <button onClick={() => handleDelete(animal.id)} className={styles.btnDelete}>Remover</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.centeredMessage}>Você ainda não cadastrou nenhum animal.</p>
            )}

            {isModalOpen && editingAnimal && (
                <EditModal 
                    animal={editingAnimal}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}