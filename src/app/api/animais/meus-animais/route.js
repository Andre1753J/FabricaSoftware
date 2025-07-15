import { meusAnimais } from "../../../../../backPets/services/animais_do_C.js";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { key } = await request.json();

        if (!key) {
            return NextResponse.json({ error: 'Chave de autenticação não fornecida.' }, { status: 400 });
        }

        const animais = await meusAnimais(key);
        return NextResponse.json(animais);

    } catch (error) {
        console.error("Erro ao buscar animais:", error.message);
        return NextResponse.json({ error: 'Erro interno do servidor ao buscar animais.', details: error.message }, { status: 500 });
    }
}