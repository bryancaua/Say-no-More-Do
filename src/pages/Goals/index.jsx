import { use } from "react";
import { HeaderTitle } from "../../components/ui/HeaderTitle";
import GoalsContext from "../../context/GoalsProvider/GoalsContext.js";
import { nomeDoMes, anoDoMes, mesesDisponiveis } from "../../utils/data.js";
import styles from "./goals.module.css";
import { GoalsCard } from "../../components/ui/GoalsCard/index.jsx";
import { CATEGORIAS } from "../../utils/categorias.js";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  X,
} from "lucide-react";
import { Form } from "../../components/ui/Form/index.jsx";
import ToDoContext from "../../context/ToDoProvider/ToDoContext.js";
import { Input } from "../../components/ui/Input/index.jsx";
import Switch from "../../components/ui/Switch/index.jsx";
import { Button } from "../../components/ui/Button/index.jsx";
import { SubmetasEtapa } from "../../components/ui/SubmetasEtapa/index.jsx";

export function Goals() {
  const {
    selecionarCategoria,
    categoriaSelecionada,
    filtroCategorias,
    setFiltroCategorias,
    metaCardsPrincipais,
    metaCardsPadrao,
    mesSelecionado,
    avançaMes,
    indiceMes,
    regrideMes,

    etapaMeta,
    irParaSubmetas,
    voltarParaDadosBasicos,
    adicionarSubmeta,
    removerSubmeta,
    submetasRascunho,
    finalizarMeta,
    cancelarCriacaoMeta,
    submetaConcluida
  } = use(GoalsContext);
  const { openForm } = use(ToDoContext);

  metaCardsPadrao.forEach((meta) => {
  meta.submetas.forEach((submeta) => {
    console.log(meta.tituloMeta, submeta.tipo, submetaConcluida(submeta));
  });
  });

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <HeaderTitle
          title="Metas e objetivos"
          description="Foque no que importa este mês"
        />
        <button className={styles.buttonMeta} onClick={() => openForm("metas")}>
          + Nova meta
        </button>
      </header>

      <Form
        name="metas"
        variant={"especial"}
        addFunction={etapaMeta === 1 ? irParaSubmetas : finalizarMeta}
      >
        <header className={styles.headerForm}>
          <div className={styles.formDiv}>
            <p className={styles.pFormMetas}>NOVA META</p>

            <h2 className={styles.h2FormMetas}>
              {etapaMeta === 1 ? "O essencial" : "Como medir o avanço"}
            </h2>
          </div>

          <X
            style={{ cursor: "pointer", color: "var(--color-primary)" }}
            size={20}
            onClick={cancelarCriacaoMeta}
          />
        </header>

        <div className={styles.div} aria-label="Etapas">
          <div className={`${styles.step} ${styles.stepActive}`}>
            <span className={styles.stepNumber}>
              {etapaMeta === 1 ? "1" : <Check size={18} />}
            </span>

            <span className={styles.p}>Básico</span>
          </div>

          <div className={styles.stepsLine} aria-hidden="true" />

          <div
            className={`${styles.step} ${
              etapaMeta === 2 ? styles.stepActive : styles.stepInactive
            }`}
          >
            <span className={styles.stepNumber}>2</span>
            <span className={styles.p}>Submetas</span>
          </div>
        </div>

        {etapaMeta === 1 ? (
          <div className={styles.divMetas}>
            <div className={styles.divMetaTitulo}>
              <p className={styles.pFormMetas}>TÍTULO</p>

              <Input
                placeholder="Dê um nome a sua meta"
                name="tituloMeta"
                required
              />
            </div>

            <div className={styles.divMetaTitulo}>
              <p className={styles.pFormMetas}>DESCRIÇÃO</p>

              <Input
                placeholder="Descreva o resultado que deseja alcançar!"
                name="descricaoMeta"
                required
              />
            </div>

            <div className={styles.divMetaTitulo}>
              <p className={styles.pFormMetas}>POR QUE ISSO IMPORTA?</p>

              <Input
                placeholder="Mentalize sua meta.."
                name="importancia"
                required
              />
            </div>

            <div className={styles.divMetaTitulo}>
              <p className={styles.pFormMetas}>CATEGORIAS</p>
              <div className={styles.categorias}>
                {CATEGORIAS.map((categoria) => (
                  <button
                    type="button"
                    className={styles.buttonCategoria}
                    key={categoria.id}
                    onClick={() => selecionarCategoria(categoria.id)}
                    style={
                      categoriaSelecionada == categoria.id
                        ? {
                            border: `2px solid ${categoria.cor}`,
                            color: `${categoria.cor}`,
                            transition: "ease 0.2s",
                          }
                        : null
                    }
                  >
                    <span
                      className={styles.bolinha}
                      style={{
                        "--cor-categoria": categoria.cor,
                        width: "10px",
                        height: "10px",
                      }}
                    />
                    {categoria.label}
                  </button>
                ))}
              </div>
            </div>

            <p className={styles.pFormMetas}>MÊS DE REFERÊNCIA</p>

            <div className={styles.divMetaFooter}>
              <select
                name="mes"
                className={styles.selectMes}
                defaultValue={mesesDisponiveis()[0]}
              >
                {mesesDisponiveis().map((mes) => (
                  <option key={mes} value={mes}>
                    {nomeDoMes(mes)} {anoDoMes(mes)}
                  </option>
                ))}
              </select>

              <label className={styles.card}>
                <div className={styles.info}>
                  <Star size={20} fill="#c9a227" color="#c9a227" />
                  <span className={styles.spanMetaToggle}>Meta principal</span>
                </div>

                <Switch name="principal" />
              </label>
            </div>

            <Button type="submit">Próximo</Button>
          </div>
        ) : (
          <SubmetasEtapa
            submetas={submetasRascunho}
            adicionarSubmeta={adicionarSubmeta}
            removerSubmeta={removerSubmeta}
            voltarParaDadosBasicos={voltarParaDadosBasicos}
          />
        )}
      </Form>

      <div className={styles.div}>
        <div className={styles.headerMes}>
          <ArrowLeft
            className={styles.button}
            onClick={() => regrideMes()}
            style={indiceMes <= 0 ? { display: "none" } : undefined}
          />
          <span className={styles.span}>
            {nomeDoMes(mesSelecionado)} {anoDoMes(mesSelecionado)}
          </span>
          <ArrowRight
            className={styles.button}
            onClick={() => avançaMes()}
            style={indiceMes >= 11 ? { display: "none" } : undefined}
          />
        </div>
      </div>

      <div className={styles.divDestaque}>
        <h2 className={styles.h2Destaque}>Em destaque</h2>
        <div className={styles.linha}></div>
      </div>

      <section className={styles.metasSection}>
        <div className={styles.cardsGrid}>
          {metaCardsPrincipais.map((meta) => {
            return (
              <div className={styles.div} key={meta.idMeta}>
                <GoalsCard key={meta.metaId} meta={meta} />
              </div>
            );
          })}
        </div>

        <div className={styles.categorias}>
          <button
            className={styles.buttonCategoria}
            onClick={() => setFiltroCategorias("todas")}
            style={
              filtroCategorias == "todas"
                ? {
                    backgroundColor: "#6B4FBB",
                    color: "#fff",
                    transition: "ease 0.2s",
                  }
                : null
            }
          >
            Todas
          </button>
          {CATEGORIAS.map((categoria) => (
            <button
              type="button"
              className={styles.buttonCategoria}
              key={categoria.id}
              onClick={() => setFiltroCategorias(categoria.id)}
              style={
                filtroCategorias == categoria.id
                  ? {
                      backgroundColor: `${categoria.cor}`,
                      color: "#fff",
                      transition: "ease 0.2s",
                    }
                  : null
              }
            >
              <span
                className={styles.bolinha}
                style={{
                  width: "10px",
                  height: "10px",
                  "--cor-categoria":
                    filtroCategorias === categoria.id ? "#fff" : categoria.cor,
                }}
              />
              {categoria.label}
            </button>
          ))}
        </div>

        <div className={styles.cardsGrid}>
          {metaCardsPadrao.map((meta) => (
            <GoalsCard key={meta.idMeta} meta={meta} />
          ))}
        </div>
      </section>
    </section>
  );
}
