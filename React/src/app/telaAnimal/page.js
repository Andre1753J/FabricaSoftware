import styles from './fichaAnimal.module.css';

export default function ficha() {
    return (
        <section>
            <main className={styles.main}>
                <div>
                    <h1 className={styles.h1}>FICHA ANIMAL</h1>
                </div>
                <div className={styles.card_form}>
                    <form action="#">
                        <label className={styles.label} htmlFor="nome">Nome</label>
                        <input type="text" name="nome" id="animal" placeholder="Nome do animal" required />

                        <label className={styles.label} htmlFor="raça">Raça</label>
                        <input type="text" name="raca" id="raca" placeholder="Raça do animal" required />

                        <label className={styles.label} htmlFor="num">Idade</label>
                        <input type="number" name="ida" id="ida" placeholder="Idade do animal" requierd />
                    </form>
                    <form action="#">
                        <label className={styles.label} htmlFor="nome">Mãe</label>
                        <input type="text" name="mom" id="mom" placeholder="Mãe do animal" />

                        <label className={styles.label} htmlFor="nome">Pai</label>
                        <input type="text" name="dad" id="dad" placeholder="Pai do animal" />

                        <label className={styles.label} htmlFor="text">Situação</label>
                        <input type="text" name="sit" id="sit" placeholder="Situação do animal" />
                    </form>
                </div>

                <div className={styles.checkbox}>
                    <fieldset  className={styles.fieldset} aria-required="true">
                        <legend>Sexo</legend>
                        <input type="checkbox" name="mac" id="macho" />
                        <label className={styles.label} htmlFor="box">Macho</label>
                        <input type="checkbox" name="fem" id="fem" />
                        <label className={styles.label} htmlFor="box">Fêmea</label>
                    </fieldset>

                    <fieldset className={styles.fieldset} aria-required="true">
                        <legend>Espécie</legend>
                        <input type="checkbox" name="fel" id="felino" />
                        <label className={styles.label} htmlFor="box">Felino</label>
                        <input type="checkbox" name="can" id="canino" />
                        <label className={styles.label} htmlFor="box">Canino</label>
                    </fieldset>

                    <fieldset className={styles.fieldset} aria-required="true">
                        <legend>Porte do Animal</legend>
                        <input type="checkbox" name="peq" id="pequeno" />
                        <label className={styles.label} htmlFor="box">Pequeno</label>
                        <input type="checkbox" name="med" id="medio" />
                        <label className={styles.label} htmlFor="box">Médio</label>
                        <input type="checkbox" name="gra" id="grande" />
                        <label className={styles.label} htmlFor="box">Grande</label>
                    </fieldset>

                </div>
                <a href="#"><button className={styles.voltar}>Voltar</button></a>
                <img className={styles.img} src="img/mdi--arrow-back-circle.png" alt="" />
                <a href="PagInfo.html"><button className={styles.salvar}>Salvar</button></a>

            </main>
        </section>
    )
}
















// import styles from "./telaAnimal.module.css";
// import Image from "next/image";

// export default function Cliente() {
//     return (
//         <section className={styles.sct}>
//         <div className={styles.div}>
//             <h1 className={styles.titulo}>Cadastro Cliente</h1>

//             <label className={styles.t2}><h4 className={styles.t}></h4></label>

//             <label className={styles.formulario}>
//                 <div className={styles.form}>
//                 <label className={styles.cls}>
//                     <p className={styles.plhld1}>NOME</p>
//                     <input className={styles.inpt} placeholder="Nome do animal" type="txt"></input>

//                     <p className={styles.plhld2}>IDADE</p>
//                     <input className={styles.inpt} placeholder="Idade do animal" type="number"></input> 

//                 </label>
//                 </div>

//                 <div className={styles.form}>
//                 <label className={styles.cls}>
               
//                     <p className={styles.plhld3}>RAÇA</p>
//                     <select className={styles.gnr}>
//                         <option className={styles.opt}>Border Collie</option>
//                         <option className={styles.opt}>Pastor Alemão</option>
//                         <option className={styles.opt}>Pastor Belga</option>
//                         <option className={styles.opt}>Cão de Pastor de Shetland</option>
//                         <option className={styles.opt}></option>
//                         <option className={styles.opt}></option>
//                         <option className={styles.opt}></option>
//                         <option className={styles.opt}></option>
//                         <option className={styles.opt}></option>
//                         <option className={styles.opt}></option>
//                         <option className={styles.opt}></option>

//                     </select>

//                     <p className={styles.plhld4}>MÃE</p>
//                     <input className={styles.inpt} placeholder="Número de RG" type="number"></input>
                
//                 </label>
//                 </div>

//                 <div className={styles.form}>
//                 <label className={styles.cls}>

//                     <p className={styles.plhld5}>PAI</p>
//                     <input className={styles.inpt} placeholder="Digite seu CPF" type="number"></input>

//                     <p className={styles.plhld6}>SITUAÇÃO</p>
//                     <input className={styles.inpt} placeholder="Digite seu endereço de email" type="txt,number"></input>

//                 </label>
//                 </div >

//                 <div className={styles.form}>
//                 <label className={styles.cls}>

//                     <p className={styles.plhld7}>ENDEREÇO</p>
//                     <input className={styles.inpt} placeholder="Digite seu endereço de sua residência" type="txt,number"></input>

//                     <p className={styles.plhld8}>ESPÉCIE</p>
//                     <input className={styles.inpt} placeholder="Digite seu código postal" type="number"></input>

//                 </label>
//                 </div >

//                 <div className={styles.form}>
//                 <label className={styles.cls}>

//                     <p className={styles.plhld9}>PORTE DO ANIMAL</p>
//                     <input className={styles.inpt} placeholder="Complemento do endereço de sua residência" type=""></input>

//                 </label>
//                 </div >

//             </label >
//             <a href="#" className={styles.card_botao}>
//           <button className={styles.button} >Continuar</button>
//         </a>
//         </div >
//         </section>
//     )
// }