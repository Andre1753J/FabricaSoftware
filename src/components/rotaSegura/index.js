"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RotaSegura({ children }) {
    const router = useRouter();
    const { isLoggedIn, userKey } = useAuth();

    useEffect(() => {
        // O `userKey` será `undefined` durante o carregamento inicial,
        // `null` se o usuário não estiver logado, e uma string se estiver logado.
        // Nós agimos apenas quando a verificação estiver completa (userKey não é undefined).
        if (userKey === null) {
            router.replace("/telaLogin");
        }
    }, [userKey, router]);

    if (!isLoggedIn) {
        // Enquanto o contexto carrega ou se o usuário não está logado, mostra uma mensagem.
        return <div>Verificando autenticação...</div>;
    }

    return children;
}