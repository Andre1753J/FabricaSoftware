"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RotaSegura({ children }) {
    const router = useRouter();
    const [autenticado, setAutenticado] = useState(null);

    useEffect(() => {
        // Só roda no client
        const key = typeof window !== "undefined" ? localStorage.getItem("clienteKey") : null;
        if (!key) {
            router.replace("/telaLogin");
        } else {
            setAutenticado(true);
        }
    }, [router]);

    if (autenticado === null) {
        // Enquanto verifica, não mostra nada
        return null;
    }

    return children;
}