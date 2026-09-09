import { use } from "react";
import { Card } from "../Card";
import styles from "./tasks.module.css";
import { Button } from "../Button";
import ToDoContext from "../ToDoProvider/ToDoContext";
import { Form } from "../Form";
import { Input } from "../Input";
import { FormHeader } from "../FormHeader";
import { CardTitle } from "../CardTitle";

export function Tasks() {
  const {
    alterarCor,
    openForm,
    lists,
    selectedList,
    setSelectedList,
    addList,
    addTodo,
    completeTodo,
    prioridadesCoresTodo,
    filterTodos,
    porcentagem,
    totalTodos,
    todosConcluidos,
    hasLists,
    hasSelection,
    listaAtual,
    setSelectedFilter,
  } = use(ToDoContext);

  function hexParaRgba(hex, opacidade) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
  }

  console.log(listaAtual?.cor);

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h1 className={styles.h1}>
            {hasLists
              ? "Selecione uma lista, vamos concluir tudo!"
              : "Não há listas criadas ainda, crie uma para começar"}
          </h1>
          <p className={styles.p}>Organize e conclua o que importa.</p>
        </header>

        <div className={styles.content}>
          <div className={styles.divList}>
            <ul className={styles.ul}>
              {lists.map(({ nome, id, cor }) => {
                return (
                  <li
                    className={styles.li}
                    key={id}
                    onClick={() => setSelectedList(id)}
                  >
                    <input
                      type="color"
                      value={cor}
                      onChange={(e) => alterarCor(id, e.target.value)}
                      className={styles.inputColorEscondido}
                    />
                    <button
                      className={styles.button}
                      style={{
                        boxShadow:
                          selectedList === id
                            ? `0px 0px 0px 0.2px ${cor}`
                            : `rgba(0, 0, 0, 0.2) 0px 0px 0px 0.4px`,
                        backgroundColor:
                          selectedList === id
                            ? hexParaRgba(cor, 0.08)
                            : "#ffff",
                      }}
                    >
                      <span
                        className={styles.bolinha}
                        style={{ backgroundColor: cor }}
                        role="button"
                      />
                      <p
                        style={{
                          fontWeight: selectedList === id ? "600" : "400",
                        }}
                        className={styles.p}
                      >
                        {nome}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Button onClick={() => openForm("list")}>+ Adicionar lista</Button>
          </div>

          <Form name="list" addFunction={addList}>
            <FormHeader>Criar lista</FormHeader>
            <Input
              name="nome"
              placeholder="Digite o nome da sua lista..."
              required
            />
            <div className={styles.colorSection}>
              <span className={styles.colorLabel}>
                Selecione a cor da sua lista
              </span>
              <div className={styles.colorPickerWrapper}>
                <Input name="cor" type="color" defaultValue="#000000" />
              </div>
            </div>

            <Button type="submit">Enviar</Button>
          </Form>

          <div className={styles.cardWrapper}>
            <Card style={{ "--color-list": listaAtual?.cor }}>
              <CardTitle>
                {lists.map(({ nome, id, cor }) => {
                  if (selectedList === id) {
                    return (
                      <div key={id} className={styles.divListTitle}>
                        <span
                          className={styles.bolinha}
                          style={{ backgroundColor: cor }}
                        />
                        <h3>{nome}</h3>

                        <p
                          className={styles.todoPendencias}
                          style={{ color: porcentagem === 100 ? "green" : "" }}
                        >
                          {todosConcluidos} de {totalTodos} concluídas
                        </p>
                      </div>
                    );
                  }
                })}

                {hasSelection && (
                  <div className={styles.barraFundo}>
                    <div
                      className={styles.barraPreenchida}
                      style={{ width: `${porcentagem}%` }}
                    />
                  </div>
                )}

                {!hasSelection && (
                  <p
                    className={styles.p}
                    style={{
                      alignSelf: "center",
                      justifySelf: "center",
                      margin: "1rem",
                    }}
                  >
                    {!hasLists
                      ? "Crie uma lista para começar"
                      : "Selecione uma lista para começar"}
                  </p>
                )}
              </CardTitle>
              <ul className={styles.ulTodo}>
                {filterTodos.map(
                  ({ nomeTodo, idTodo, prioridade, concluido }) => {
                    return (
                      <div className={styles.todoElement} key={idTodo}>
                        <li className={styles.todoLi}>
                          <input
                            type="checkbox"
                            checked={concluido}
                            onChange={() => completeTodo(idTodo)}
                          />
                          <p
                            style={{
                              fontWeight: "500",
                              fontSize: "14px",
                              textDecorationLine:
                                concluido === true ? "line-through" : "none",
                              opacity: concluido === true ? "40%" : "100%",
                            }}
                          >
                            {nomeTodo}
                          </p>
                          <p
                            className={styles.prioridadeTodo}
                            style={{
                              "--color-priority":
                                prioridadesCoresTodo[prioridade],
                            }}
                          >
                            {prioridade}
                          </p>
                        </li>
                      </div>
                    );
                  }
                )}
              </ul>

              {hasSelection && (
                <div className={styles.div}>
                  <div className={styles.divFilters}>
                    <Button onClick={() => setSelectedFilter("todas")}>
                      <p>Todas</p>
                    </Button>
                    <Button onClick={() => setSelectedFilter("pendentes")}>
                      <p>Pendentes</p>
                    </Button>
                    <Button onClick={() => setSelectedFilter("concluidas")}>
                      <p>Finalizadas</p>
                    </Button>
                  </div>
                  <Button
                    style={{ width: "15%" }}
                    onClick={() => openForm("todo")}
                  >
                    + Add
                  </Button>
                </div>
              )}

              <Form name="todo" addFunction={addTodo}>
                <FormHeader>Criar To-Do</FormHeader>
                <Input
                  name="nomeTodo"
                  placeholder="Digite o nome do seu to-do..."
                  required
                />
                <p className={styles.p}>Selecione a prioridade do seu To-Do</p>
                <select
                  name="prioridade"
                  defaultValue="Baixa"
                  className={styles.selectPrioridade}
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
                <Button type="submit">Enviar</Button>
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
