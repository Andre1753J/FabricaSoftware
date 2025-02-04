import styles from "./telaCliente.module.css";
import Image from "next/image";

export default function Cliente() {
    return (
        <div className={styles.div}>
            <h1 className={styles.titulo}>Cadastro do Cliente</h1>
            <label className={styles.form1}>
                <a className={styles.a}>Nome<input className={styles.inp} placeholder="Digite seu nome" type="name"></input></a>
            </label>
            <label className={styles.form2}>
                <a className={styles.a}>Idade<input className={styles.inp} placeholder="Digite sua idade" type="number"></input></a>
                </label>
            <label className={styles.form_select}>Sexo
                <select className={styles.inp_select}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </label>
                <a className={styles.a}>RG<input placeholder="Digite sua inscrição estadual" type="number"></input></a>
                <a className={styles.a}>CPF/CNPJ<input placeholder="Digite seu CPF ou CNPJ" type="number"></input></a>
                <a className={styles.a}>E-mail<input placeholder="Digite seu email" type="email"></input></a>
                <a className={styles.a}>Bairro<input placeholder="Digite seu bairro" type="txt, number"></input></a>
                <a className={styles.a}>CEP<input placeholder="Digite o CEP" type="number"></input></a>
                <a className={styles.a}>Complemento<input placeholder="Complemento da residência" type="txt"></input></a>
                <a className={styles.a}>Telefone 1<input placeholder="" type="number"></input></a>
                <a className={styles.a}>Telefone 2<input placeholder="" type="number"></input></a>
            </label>

        </div>
    )
}