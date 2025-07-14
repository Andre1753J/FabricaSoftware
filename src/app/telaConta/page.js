"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './telaConta.module.css';
import RotaSegura from '@/components/rotaSegura';
import { API_ROUTES } from '@/lib/api';

const MinhaConta = () => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: '',
  });
  const [passwordError, setPasswordError] = useState('');

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

  const handleOpenPasswordModal = () => {
    setPasswordError('');
    setPasswordData({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
    setIsChangingPassword(true);
  };

  const handleClosePasswordModal = () => setIsChangingPassword(false);

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordData.novaSenha.length < 8) {
      return setPasswordError('A nova senha deve ter no mínimo 8 caracteres.');
    }
    if (passwordData.novaSenha !== passwordData.confirmarNovaSenha) {
      return setPasswordError('As novas senhas não coincidem.');
    }

    const key = localStorage.getItem("clienteKey");
    try {
      const response = await fetch(API_ROUTES.mudarSenha(key), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao alterar a senha.');
      }

      localStorage.setItem("clienteKey", data.data.newKey);
      alert('Senha alterada com sucesso!');
      handleClosePasswordModal();
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("clienteKey");
    alert("Você foi desconectado com sucesso.");
    router.push('/'); // Redireciona para a página inicial
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados, incluindo animais cadastrados, serão perdidos."
    );

    if (confirmed) {
      const key = localStorage.getItem("clienteKey");
      if (!key) {
        alert("Erro: Usuário não autenticado.");
        return;
      }

      try {
        const response = await fetch(API_ROUTES.deletarCliente(key), {
          method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.erro || 'Falha ao excluir a conta.');
        }

        alert('Conta excluída com sucesso!');
        localStorage.removeItem("clienteKey");
        router.push('/'); // Redireciona para a página inicial
      } catch (err) {
        alert(`Erro ao excluir a conta: ${err.message}`);
      }
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
          <button className={styles.changePasswordButton} onClick={handleOpenPasswordModal}>Mudar senha</button>
          <button className={styles.logoutButton} onClick={handleLogout}>Sair da Conta</button>
          <button className={styles.deleteButton} onClick={handleDeleteAccount}>Excluir Conta</button>
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

        {isChangingPassword && (
          <div className={styles.modalOverlay}>
            <form className={styles.modalContent} onSubmit={handlePasswordSave}>
              <h2 className={styles.t2}>Mudar Senha</h2>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>Senha Atual:</span>
                <input name="senhaAtual" type="password" value={passwordData.senhaAtual} onChange={handlePasswordInputChange} className={styles.editInput} required />
              </div>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>Nova Senha:</span>
                <input name="novaSenha" type="password" value={passwordData.novaSenha} onChange={handlePasswordInputChange} className={styles.editInput} required />
              </div>
              <div className={styles.editItem}>
                <span className={styles.infoLabel}>Confirmar Nova Senha:</span>
                <input name="confirmarNovaSenha" type="password" value={passwordData.confirmarNovaSenha} onChange={handlePasswordInputChange} className={styles.editInput} required />
              </div>
              {passwordError && <div style={{ color: 'red', marginTop: '10px', width: '100%', textAlign: 'center' }}>{passwordError}</div>}
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={handleClosePasswordModal}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Nova Senha</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </RotaSegura>
  );
};

export default MinhaConta;