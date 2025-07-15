import { removerAnimal } from "@/backPets/services/remover_A.js";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { key, animalID } = await request.json();

        if (!key || !animalID) {
            return NextResponse.json({ error: 'Dados insuficientes para remover o animal.' }, { status: 400 });
        }

        await removerAnimal(key, animalID);
        return NextResponse.json({ message: 'Animal removido com sucesso.' });

    } catch (error) {
        console.error("Erro ao remover animal:", error.message);
        return NextResponse.json({ error: 'Erro ao remover o animal.', details: error.message }, { status: 500 });
    }
}