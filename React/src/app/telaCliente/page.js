import styles from "./telaCliente.module.css";
import Image from "next/image";

export default function Sobre() {
    return (
        <div>
            <h1>Cadastro do Cliente</h1>
           <label>
                <a>Nome<input placeholder="Digite seu nome" type="name"></input></a>
                <a>Idade<input placeholder="Digite sua idade" type="number"></input></a>
                <a>Masculino<input type="checkbox"></input>Femenino<input type="checkbox"></input></a>
                <a>RG<input placeholder="Digite sua inscrição estadual" type="number"></input></a>
                <a>CPF/CNPJ<input placeholder="Digite seu CPF ou CNPJ" type="number"></input></a>
                <a>E-mail<input placeholder="Digite seu email" type="email"></input></a>
                <a>Bairro<input placeholder="Digite seu bairro" type="txt, number"></input></a>
                <a>CEP<input placeholder="Digite o CEP" type="number"></input></a>
                <a>Complemento<input placeholder="Complemento da residência" type="txt"></input></a>
                <a>Telefone 1<input placeholder="" type="number"></input></a>
                <a>Telefone 2<input placeholder="" type="number"></input></a>
            </label>
        </div>
    )
}