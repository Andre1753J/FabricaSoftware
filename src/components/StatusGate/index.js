'use client'
import { useEffect, useState } from "react";

export default function StatusGate({ children }) {
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    const verificar = async () => {
        const res = await fetch("http://localhost:9000/api/status");
        const data = await res.json();
        if (res.ok && data.status) {
          setStatus("ok");
        } 
    };

    verificar();
  }, []);

  if (status === "loading") return <p>Carregando...</p>;
  if (status === "manutencao") return <p>⚠️ Site em manutenção, volte mais tarde.</p>;
  return children;
}
