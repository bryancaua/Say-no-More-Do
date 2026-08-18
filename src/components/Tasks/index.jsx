import { use } from "react";
import { Card } from "../Card";
import styles from "./tasks.module.css";
import { Button } from "../Button";
import ToDoContext from "../ToDoProvider/ToDoContext";
import { Form } from "../Form";
import { Input } from "../Input";
import {X} from "lucide-react";

export function Tasks() {
  const { alterarCor, openForm, lists, closeForm, selectedList, setSelectedList } = use(ToDoContext);


  function hexParaRgba(hex, opacidade) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

  console.log(selectedList)

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
                  <li className={styles.li} key={id} onClick={() => setSelectedList(id)} >
                    <input
                      type="color"
                      value={cor}
                      onChange={(e) => alterarCor(id, e.target.value)}
                      className={styles.inputColorEscondido}
                    />
                    <button className={styles.button}
                      style={{boxShadow: selectedList === id ? `0px 0px 0px 0.2px ${cor}` : `rgba(0, 0, 0, 0.2) 0px 0px 0px 0.4px`, backgroundColor: selectedList === id ? hexParaRgba(cor, 0.08) : "#ffff",}}
                    >
                      <span
                        className={styles.bolinha}
                        style={{ backgroundColor: cor }}
                        role="button"
                      />
                      <p style={{fontWeight: selectedList === id ? "600" : "400"}} className={styles.p}>{nome}</p>
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
