import styles from "./telaCliente.module.css";
import Image from "next/image";

export default function Cliente() {
    return (
        <div className={styles.div}>
            <h1 className={styles.titulo}>Cadastro do Cliente</h1>
            <label className={styles.form}>
                <a className={styles.a}>Nome<input className={styles.inp} placeholder="Digite seu nome" type="name"></input></a>
            </label>
                <a className={styles.a}>Idade<input className={styles.inp} placeholder="Digite sua idade" type="number"></input></a>
            <label className={styles.form1}>Sexo
                <select className={styles.inp}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </label>
                <a className={styles.a}>RG<input className={styles.inp} placeholder="Digite sua inscrição estadual" type="number"></input></a>
                <a className={styles.a}>CPF/CNPJ<input className={styles.inp} placeholder="Digite seu CPF ou CNPJ" type="number"></input></a>
                <a className={styles.a}>E-mail<input className={styles.inp} placeholder="Digite seu email" type="email"></input></a>
                <a className={styles.a}>Bairro<input className={styles.inp} placeholder="Digite seu bairro" type="txt, number"></input></a>
                <a className={styles.a}>CEP<input className={styles.inp} placeholder="Digite o CEP" type="number"></input></a>
                <a className={styles.a}>Complemento<input className={styles.inp} placeholder="Complemento da residência" type="txt"></input></a>
                <a className={styles.a}>Telefone 1<input className={styles.inp} placeholder="" type="number"></input></a>
                <a className={styles.a}>Telefone 2<input className={styles.inp} placeholder="" type="number"></input></a>
            

        </div>
    )
}