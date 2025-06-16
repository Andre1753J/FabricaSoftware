"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const RotaSegura = ({ children }) => {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const key = typeof window !== "undefined" ? localStorage.getItem("clienteKey") : null;
    if (!key) {
      router.replace("/telaLogin");
    } else {
      setCarregando(false);
    }
  }, [router]);

  if (carregando) {
    return null;
  }

  return children;
};

export default RotaSegura;