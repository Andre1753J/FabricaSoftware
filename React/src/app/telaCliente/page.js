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
                <a className={styles.a}>Idade</a><input className={styles.inp} placeholder="Digite sua idade" type="number"></input>
                </label>
            <label className={styles.form_select}>Sexo
                <select className={styles.inp_select}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </label>
            <label className={styles.form3}>
                <a className={styles.a}>RG<input className={styles.inp} placeholder="Digite sua inscrição estadual" type="number"></input></a>
                </label>
                <label className={styles.form4}>
                <a className={styles.a}>CPF/CNPJ<input className={styles.inp} placeholder="Digite seu CPF ou CNPJ" type="number"></input></a>
                </label>
                <label className={styles.form5}>
                <a className={styles.a}>E-mail<input className={styles.inp} placeholder="Digite seu email" type="email"></input></a>
                </label>
                <label className={styles.form6}>
                <a className={styles.a}>Bairro<input className={styles.inp} placeholder="Digite seu bairro" type="txt, number"></input></a>
                </label>
                <label className={styles.form7}>
                <a className={styles.a}>CEP<input className={styles.inp} placeholder="Digite o CEP" type="number"></input></a>
                </label>
                <label className={styles.form8}>
                <a className={styles.a}>Complemento<input className={styles.inp} placeholder="Complemento da residência" type="txt"></input></a>
                </label>
                <label className={styles.form9}>
                <a className={styles.a}>Telefone 1<input className={styles.inp} placeholder="" type="number"></input></a>
                </label>
                <label className={styles.form10}>
                <a className={styles.a}>Telefone 2<input className={styles.inp} placeholder="" type="number"></input></a>
                </label>
        </div>
    )
}