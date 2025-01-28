import styles from "./telaCliente.module.css";
import Image from "next/image";

export default function Sobre() {
    return (
        <div>
            <h1>Cadastro do Cliente</h1>
           <label>
                <a>Nome<input placeholder="Digite seu nome" type="name"></input></a>
                <a>Idade<input placeholder="Digite sua idade" type="number"></input></a>
            </label>
            <label>
                <a>Masculino<input type="checkbox"></input>Femenino<input type="checkbox"></input></a>
            </label>
        </div>
    )
}