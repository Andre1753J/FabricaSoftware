import React, { useEffect, useState } from 'react';
import './styles.css';

export default function MyRequests() {
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    setMyRequests([
      { id: 1, owner: 'Carlos Mendes', pet: 'Papagaio - Zeca', status: 'Aguardando' },
      { id: 2, owner: 'Ana Lima', pet: 'Cachorro - Bob', status: 'Recusado' },
    ]);
  }, []);

  const handleCancel = (id) => {
    setMyRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Cancelado' } : req));
  };

  return (
    <div className="container">
      <h1 className="title">Minhas Solicitações de Adoção</h1>
      <ul className="list">
        {myRequests.map(req => (
          <li key={req.id} className="card">
            <p><strong>Dono Atual:</strong> {req.owner}</p>
            <p><strong>Animal:</strong> {req.pet}</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === 'Aguardando' && (
              <button onClick={() => handleCancel(req.id)} className="btn cancel">Cancelar Pedido</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}