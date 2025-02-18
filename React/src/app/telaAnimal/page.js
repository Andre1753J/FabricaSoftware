import styles from "./telaAnimal.module.css";
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
                    <input className={styles.inpt} placeholder="Nome do animal" type="txt"></input>

                    <p className={styles.plhld2}>IDADE</p>
                    <input className={styles.inpt} placeholder="Idade do animal" type="number"></input> 

                </label>
                </div>

                <div className={styles.form}>
                <label className={styles.cls}>
               
                    <p className={styles.plhld3}>RAÇA</p>
                    <select className={styles.gnr}>
                        <option className={styles.opt}>Border Collie</option>
                        <option className={styles.opt}>Pastor Alemão</option>
                        <option className={styles.opt}>Pastor Belga</option>
                        <option className={styles.opt}>Cão de Pastor de Shetland</option>
                        <option className={styles.opt}></option>
                        <option className={styles.opt}></option>
                        <option className={styles.opt}></option>
                        <option className={styles.opt}></option>
                        <option className={styles.opt}></option>
                        <option className={styles.opt}></option>
                        <option className={styles.opt}></option>

                    </select>

                    <p className={styles.plhld4}>MÃE</p>
                    <input className={styles.inpt} placeholder="Número de RG" type="number"></input>
                
                </label>
                </div>

                <div className={styles.form}>
                <label className={styles.cls}>

                    <p className={styles.plhld5}>PAI</p>
                    <input className={styles.inpt} placeholder="Digite seu CPF" type="number"></input>

                    <p className={styles.plhld6}>SITUAÇÃO</p>
                    <input className={styles.inpt} placeholder="Digite seu endereço de email" type="txt,number"></input>

                </label>
                </div >

                <div className={styles.form}>
                <label className={styles.cls}>

                    <p className={styles.plhld7}>ENDEREÇO</p>
                    <input className={styles.inpt} placeholder="Digite seu endereço de sua residência" type="txt,number"></input>

                    <p className={styles.plhld8}>ESPÉCIE</p>
                    <input className={styles.inpt} placeholder="Digite seu código postal" type="number"></input>

                </label>
                </div >

                <div className={styles.form}>
                <label className={styles.cls}>

                    <p className={styles.plhld9}>PORTE DO ANIMAL</p>
                    <input className={styles.inpt} placeholder="Complemento do endereço de sua residência" type=""></input>

                </label>
                </div >

            </label >
            <a href="#" className={styles.card_botao}>
          <button className={styles.button} >Continuar</button>
        </a>
        </div >
        </section>
    )
}