import Image from 'next/image';
import styles from './telaConta.module.css';

const MinhaConta = () => {
  return (
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
        <button className={styles.editButton}>Editar perfil de usuário</button>
      </div>

      <div className={styles.securitySection}>
        <h2 className={styles.t2}>Senha e Segurança</h2>
        <button className={styles.changePasswordButton}>Mudar senha</button>
        <p className={styles.t1}>Desativar a conta significa que você poderá recuperá-la quando quiser.</p>
        <button className={styles.deactivateButton}>Desativar Conta</button>
        <button className={styles.logoutButton}>Excluir Conta</button>
      </div>
    </div>
  );
};

export default MinhaConta;