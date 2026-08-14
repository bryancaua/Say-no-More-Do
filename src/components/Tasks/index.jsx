import { use } from "react";
import { Card } from "../Card";
import styles from "./tasks.module.css";
import { Button } from "../Button";
import ToDoContext from "../ToDoProvider/ToDoContext";
import { Form } from "../Form";
import { Input } from "../Input";
import {X} from "lucide-react";

export function Tasks() {
  const { alterarCor, openForm, lists, closeForm } = use(ToDoContext);

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

          <Form>
            <div className={styles.div}>
              <h2>Criar lista</h2>
              <X style={{ cursor: "pointer", color: "var(--color-primary)" }} size={20} onClick={() => closeForm()} />
            </div>
            <Input name="nome" placeholder="Digite o nome da sua lista..." required/>
            <div className={styles.colorSection}>
              <span className={styles.colorLabel}>Selecione a cor da sua lista</span>
              <div className={styles.colorPickerWrapper}>
                <Input name="cor" type="color" defaultValue="#000000" />
              </div>
            </div>
            
            <Button type="submit">Enviar</Button>
          </Form>

          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
      </section>
    </>
  );
}
