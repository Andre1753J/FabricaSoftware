"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './telaConta.module.css';
import RotaSegura from '@/components/rotaSegura';
import { API_ROUTES } from '@/lib/api';

const MinhaConta = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const key = localStorage.getItem("clienteKey");
    if (!key) {
      // O componente RotaSegura já deve redirecionar, mas é uma boa prática ter um fallback.
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      // A key é passada na URL, não no header para essa rota
      const response = await fetch(API_ROUTES.infoCliente(key));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.erro || 'Falha ao buscar dados do usuário');
      }

      const data = await response.json();
      setUserData(data.data); // A API retorna { data: { ... } }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditData({ ...userData, senhaAtual: '' }); // Inicializa o form com os dados atuais
    setIsEditing(true);
  };

  const handleCloseModal = () => setIsEditing(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const key = localStorage.getItem("clienteKey");

    try {
      const response = await fetch(API_ROUTES.editarCliente(key), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao atualizar.');
      }

      if (data.data && data.data.newKey) {
        localStorage.setItem("clienteKey", data.data.newKey);
      }
      alert('Dados atualizados com sucesso!');
      handleCloseModal();
      fetchData(); // Atualiza os dados na página
    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };

  if (loading) return <div className={styles.centeredMessage}>Carregando...</div>;
  if (error) return <div className={styles.centeredMessage}>Erro: {error}</div>;

  return (
    <RotaSegura>
      <div className={styles.contaContainer}>
        <h1 className={styles.t1}>Minha Conta</h1>
        <div className={styles.infoSection}>
          <h2 className={styles.t2}>Informações do Usuário</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Nome:</span>
            <span className={styles.infoValue}>{userData?.nome || 'Não informado'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>E-mail:</span>
            <span className={styles.infoValue}>{userData?.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Telefone:</span>
            <span className={styles.infoValue}>{userData?.telefone || 'Você ainda não adicionou um telefone'}</span>
          </div>
          <button className={styles.editButton} onClick={handleEditClick}>
            Editar perfil de usuário
          </button>
        </div>

        <div className={styles.securitySection}>
          <h2 className={styles.t2}>Senha e Segurança</h2>
          <button className={styles.changePasswordButton}>Mudar senha</button>
          <button className={styles.logoutButton}>Sair da Conta</button>
          <button className={styles.deleteButton}>Excluir Conta</button>
        </div>

        {isEditing && (
          <div className={styles.modalOverlay}>
            <form className={styles.modalContent} onSubmit={handleSave}>
              <h2 className={styles.t2}>Editar Perfil</h2>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>Nome:</span>
                <input name="nome" type="text" value={editData.nome || ''} onChange={handleInputChange} className={styles.editInput} />
              </div>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>E-mail:</span>
                <input name="email" type="email" value={editData.email || ''} onChange={handleInputChange} className={styles.editInput} />
              </div>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>Telefone:</span>
                <input name="telefone" type="tel" placeholder="Adicionar telefone" value={editData.telefone || ''} onChange={handleInputChange} className={styles.editInput} />
              </div>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>Senha Atual:</span>
                <input name="senhaAtual" type="password" placeholder="******** para confirmar" value={editData.senhaAtual || ''} onChange={handleInputChange} className={styles.editInput} required />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Pronto</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </RotaSegura>
  );
};

export default MinhaConta;