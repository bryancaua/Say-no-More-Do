import { use } from "react";
import { Card } from "../Card";
import styles from "./tasks.module.css";
import { Button } from "../Button";
import ToDoContext from "../ToDoProvider/ToDoContext";


export function Tasks() {
  const {isOpen, alterarCor, openForm, lists} = use(ToDoContext)

  console.log(isOpen)

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Você ainda não possui listas criadas</h1>
          <p className={styles.p}>Organize e conclua o que importa.</p>
        </header>

        <div className={styles.content}>
          <div className={styles.divList}>
            <ul className={styles.ul}>
              {lists.map(({ nome, id, cor }) => {
                return (
                  <li className={styles.li} key={id}>
                    <input
                      type="color"
                      value={cor}
                      onChange={(e) => alterarCor(id, e.target.value)}
                      className={styles.inputColorEscondido}
                    />
                    <button className={styles.button}>
                      <span
                        className={styles.bolinha}
                        style={{ backgroundColor: cor }}
                        role="button"
                      />
                      {nome}
                    </button>
                  </li>
                );
              })}
            </ul>
            <Button onClick={() => openForm()}>+ Adicionar lista</Button>

          </div>

          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
      </section>
    </>
  );
}
