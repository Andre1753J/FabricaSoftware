"use client";

import Link from 'next/link';
import React from 'react';

// Adicionar "use client" é crucial porque a página de erro 404
// é renderizada dentro do seu Layout principal. Se o Layout tiver
// componentes que usam hooks de cliente (como um Header com `useAuth`),
// esta página também precisa ser um "Client Component" para evitar o erro de build.

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif', color: '#333' }}>
      <h1>404 - Página Não Encontrada</h1>
      <p style={{ marginBottom: '2rem' }}>Oops! A página que você está procurando não existe ou foi movida.</p>
      <Link href="/" style={{ color: '#fff', backgroundColor: '#0070f3', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}