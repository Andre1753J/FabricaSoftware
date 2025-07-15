"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/components/withAuth'; // Protege a rota, garantindo que o usuário está logado
import { API_ROUTES } from '@/lib/api';
import styles from './CadastroAnimal.module.css'; // Usaremos um CSS module para estilo

function CadastroAnimalPage() {
  const router = useRouter();
  const { userKey } = useAuth(); // O HOC withAuth garante que userKey estará disponível
  
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    raca: '',
    data_nascimento: '',
    sexo: 'Macho',
    porte: 'Pequeno',
    descricao: '',
  });
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      // Cria uma URL local para a pré-visualização da imagem
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!imagem) {
      setError('Por favor, selecione uma imagem para o animal.');
      return;
    }

    setLoading(true);

    // Usamos FormData quando enviamos arquivos (imagens)
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('imagem', imagem);

    try {
      const response = await fetch(API_ROUTES.cadastroAnimal(userKey), {
        method: 'POST',
        body: data, // Ao usar FormData, o browser define o Content-Type correto automaticamente
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ocorreu um erro ao cadastrar o animal.');
      }

      alert('Animal cadastrado com sucesso!');
      router.push('/perfil'); // Redireciona para o perfil do usuário

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.titulo}>Cadastrar Novo Animal para Adoção</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome do Animal</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="especie">Espécie</label>
            <input type="text" name="especie" id="especie" placeholder="Ex: Cachorro, Gato" value={formData.especie} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="raca">Raça</label>
            <input type="text" name="raca" id="raca" value={formData.raca} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="data_nascimento">Data de Nascimento</label>
            <input type="date" name="data_nascimento" id="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
          </div>
          <div className={styles.selectGroup}>
            <div>
              <label htmlFor="sexo">Sexo</label>
              <select name="sexo" id="sexo" value={formData.sexo} onChange={handleChange}>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
            <div>
              <label htmlFor="porte">Porte</label>
              <select name="porte" id="porte" value={formData.porte} onChange={handleChange}>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="descricao">Descrição (comportamento, história, etc)</label>
            <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} rows="4"></textarea>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="imagem">Foto do Animal</label>
            <input type="file" name="imagem" id="imagem" accept="image/*" onChange={handleFileChange} required />
          </div>
          {preview && <div className={styles.previewContainer}><img src={preview} alt="Pré-visualização" className={styles.imagePreview} /></div>}
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar Animal'}</button>
        </form>
      </div>
    </main>
  );
}

export default withAuth(CadastroAnimalPage);