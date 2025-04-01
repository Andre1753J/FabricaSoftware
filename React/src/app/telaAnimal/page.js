import styles from './fichaAnimal.module.css';

export default function FichaAnimal() {
    return (
        <section className={styles.section}>
            <main className={styles.main}>
                <h1 className={styles.title}>FICHA ANIMAL</h1>
                
                <div className={styles.formContainer}>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="nome">Nome</label>
                            <input className={styles.input} type="text" id="nome" placeholder="Nome do animal" required />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="raca">Raça</label>
                            <input className={styles.input} type="text" id="raca" placeholder="Raça do animal" required />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="idade">Data de nascimento</label>
                            <input className={styles.input} type="number" id="idade" placeholder="Data de nascimento do animal" required />
                        </div>
                    </form>

                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="mae">Mãe</label>
                            <input className={styles.input} type="text" id="mae" placeholder="Mãe do animal" />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="pai">Pai</label>
                            <input className={styles.input} type="text" id="pai" placeholder="Pai do animal" />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="situacao">Situação</label>
                            <input className={styles.input} type="text" id="situacao" placeholder="Situação do animal" />
                        </div>
                    </form>
                </div>

                <div className={styles.checkboxGroup}>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Sexo</legend>
                        <div className={styles.checkboxItem}>
                            <input type="radio" name="sexo" id="macho" />
                            <label className={styles.label} htmlFor="macho">Macho</label>
                        </div>
                        <div className={styles.checkboxItem}>
                            <input type="radio" name="sexo" id="femea" />
                            <label className={styles.label} htmlFor="femea">Fêmea</label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Espécie</legend>
                        <div className={styles.checkboxItem}>
                            <input type="radio" name="especie" id="felino" />
                            <label className={styles.label} htmlFor="felino">Felino</label>
                        </div>
                        <div className={styles.checkboxItem}>
                            <input type="radio" name="especie" id="canino" />
                            <label className={styles.label} htmlFor="canino">Canino</label>
                        </div>
                    </fieldset>
                </div>

                <button className={styles.button}>Salvar</button>
            </main>
        </section>
    );
}