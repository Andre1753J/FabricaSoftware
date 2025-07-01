import React, { useEffect, useState } from 'react';
import './styles.css';

export default function ReceivedRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests([
      { id: 1, requester: 'João Silva', pet: 'Cachorro - Rex', date: '2025-06-30', status: 'Aguardando' },
      { id: 2, requester: 'Maria Souza', pet: 'Gato - Mia', date: '2025-06-28', status: 'Aceito' },
    ]);
  }, []);

  const handleDecision = (id, decision) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: decision } : req));
  };

  return (
    <div className="container">
      <h1 className="title">Pedidos de Adoção Recebidos</h1>
      <ul className="list">
        {requests.map(req => (
          <li key={req.id} className="card">
            <p><strong>Solicitante:</strong> {req.requester}</p>
            <p><strong>Animal:</strong> {req.pet}</p>
            <p><strong>Data:</strong> {req.date}</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === 'Aguardando' && (
              <div className="actions">
                <button onClick={() => handleDecision(req.id, 'Aceito')} className="btn accept">Aceitar</button>
                <button onClick={() => handleDecision(req.id, 'Recusado')} className="btn reject">Recusar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}