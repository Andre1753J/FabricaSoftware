import styles from "./telaCliente.module.css";
import Image from "next/image";

export default function Cliente() {
    return (
        <section className={styles.sct}>
        <div className={styles.div}>
            <h1 className={styles.titulo}>Cadastro Cliente</h1>

            <label className={styles.t2}><h4 className={styles.t}></h4></label>

            <label className={styles.formulario}>
                <div className={styles.form}>
                <label className={styles.cls}>
                    <p className={styles.plhld1}>NOME</p>
                    <input className={styles.inpt} placeholder="Digite seu nome" type="txt"></input>

                    <p className={styles.plhld2}>IDADE</p>
                    <input className={styles.inpt} placeholder="Digite sua idade" type="number"></input> 

                </label>
                </div>

                <div className={styles.form}>
                <label className={styles.cls}>
               
                    <p className={styles.plhld3}>SEXO</p>
                    <select className={styles.gnr}>
                        <option className={styles.opt}>Masculino</option>
                        <option className={styles.opt}>Femenino</option>
                    </select>

                    <p className={styles.plhld4}>RG</p>
                    <input className={styles.inpt} placeholder="Número de RG" type="number"></input>
                
                </label>
                </div>

                <div className={styles.form}>
                <label className={styles.cls}>

                    <p className={styles.plhld5}>CPF</p>
                    <input className={styles.inpt} placeholder="Digite seu CPF" type="number"></input>

                    <p className={styles.plhld6}>EMAIL</p>
                    <input className={styles.inpt} placeholder="Digite seu endereço de email" type="txt,number"></input>

                </label>
                </div >

                <div className={styles.form}>
                <label className={styles.cls}>

                    <p className={styles.plhld7}>ENDEREÇO</p>
                    <input className={styles.inpt} placeholder="Digite seu endereço de sua residência" type="txt,number"></input>

                    <p className={styles.plhld8}>CEP</p>
                    <input className={styles.inpt} placeholder="Digite seu código postal" type="number"></input>

                </label>
                </div >

                <div className={styles.form}>
                <label className={styles.cls}>

                    <p className={styles.plhld9}>COMPLEMENTO</p>
                    <input className={styles.inpt} placeholder="Complemento do endereço de sua residência" type=""></input>

                    <p className={styles.plhld10}>TELEFONE 1</p>
                    <input className={styles.inpt} placeholder="Digite seu telefone" type="number,txt"></input>

                </label>
                </div >

            </label >
        </div >
        </section>
    )
}