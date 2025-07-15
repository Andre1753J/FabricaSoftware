"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ROUTES } from '@/lib/api';
import styles from './cadastro_c.module.css'; // Usaremos um CSS module para estilização

export default function CadastroClientePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    data_nascimento: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      // Remove o 'confirmarSenha' antes de enviar para a API
      const { confirmarSenha, ...payload } = formData;

      const response = await fetch(API_ROUTES.cadastroCliente, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ocorreu um erro ao realizar o cadastro.');
      }

      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      router.push('/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.titulo}>Crie sua Conta</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" name="telefone" id="telefone" value={formData.telefone} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="data_nascimento">Data de Nascimento</label>
            <input type="date" name="data_nascimento" id="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha</label>
            <input type="password" name="senha" id="senha" value={formData.senha} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input type="password" name="confirmarSenha" id="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </main>
  );
}