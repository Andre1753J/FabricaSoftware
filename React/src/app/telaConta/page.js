'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './telaConta.module.css';
import RotaSegura from '@/components/rotaSegura';

const MinhaConta = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <RotaSegura>
      <div className={styles.contaContainer}>
      <h1 className={styles.t1}>Minha Conta</h1>
      <div className={styles.infoSection}>
        <h2 className={styles.t2}>Informações do Usuário</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Nome exibido:</span>
          <span className={styles.infoValue}>Usuario123</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Nome de Usuário:</span>
          <span className={styles.infoValue}>usuario123</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>E-mail:</span>
          <span className={styles.infoValue}>www.regmail.com</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Telefone:</span>
          <span className={styles.infoValue}>Você ainda não adicionou um telefone</span>
        </div>
        <button className={styles.editButton} onClick={handleEditClick}>Editar perfil de usuário</button>
      </div>

      <div className={styles.securitySection}>
        <h2 className={styles.t2}>Senha e Segurança</h2>
        <button className={styles.changePasswordButton}>Mudar senha</button>
        <p className={styles.t1}>Desativar a conta significa que você poderá recuperá-la quando quiser.</p>
        <button className={styles.deactivateButton}>Desativar Conta</button>
        <button className={styles.logoutButton}>Excluir Conta</button>
      </div>

      {isEditing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.t2}>Editar Perfil</h2>
            <div className={styles.editItem}>
              <span className={styles.infoLabel}>Nome exibido:</span>
              <input type="text" defaultValue="Usuario123" className={styles.editInput} />
            </div>
            <div className={styles.editItem}>
              <span className={styles.infoLabel}>Nome de Usuário:</span>
              <input type="text" defaultValue="usuario123" className={styles.editInput} />
            </div>
            <div className={styles.editItem}>
              <span className={styles.infoLabel}>E-mail:</span>
              <input type="email" defaultValue="www.regmail.com" className={styles.editInput} />
            </div>
            <div className={styles.editItem}>
              <span className={styles.infoLabel}>Telefone:</span>
              <input type="tel" placeholder="Adicionar telefone" className={styles.editInput} />
            </div>
            <div className={styles.editItem}>
              <span className={styles.infoLabel}>Senha Atual:</span>
              <input type="password" placeholder="********" className={styles.editInput} />
            </div>
            <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
            <button className={styles.saveButton}>Pronto</button>
          </div>
        </div>
      )}
    </div>
    </RotaSegura>
  );
};

export default MinhaConta;