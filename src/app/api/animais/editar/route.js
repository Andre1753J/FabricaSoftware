import { editar_A } from "@/backPets/services/editar_A.js";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { key, animalID, ...campos } = body;
        
        if (!key || !animalID) {
            return NextResponse.json({ error: 'Dados insuficientes para editar o animal.' }, { status: 400 });
        }
        
        // A função editar_A espera os parâmetros nomeados
        // Certifique-se de que os nomes dos campos em 'campos' correspondem aos parâmetros da função
        await editar_A(
            key,
            campos.nome,
            campos.dt_nascimento,
            campos.sexo,
            campos.disponivel,
            campos.descricao,
            campos.castrado,
            campos.vacinado,
            campos.vermifugado,
            campos.adotador,
            campos.idEspecie,
            campos.idRaca,
            campos.idCor,
            campos.idPorte,
            animalID
        );
        
        return NextResponse.json({ message: 'Animal atualizado com sucesso.' });

    } catch (error) {
        console.error("Erro ao editar animal:", error.message);
        return NextResponse.json({ error: 'Erro ao editar o animal.', details: error.message }, { status: 500 });
    }
}