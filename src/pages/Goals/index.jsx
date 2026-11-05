import { use } from "react";
import GoalsContext from "../../context/GoalsProvider/GoalsContext.js";
import { nomeDoMes, anoDoMes, mesesDisponiveis } from "../../utils/data.js";
import styles from "./goals.module.css";
import { GoalsCard } from "../../components/ui/GoalsCard/index.jsx";
import { CATEGORIAS } from "../../utils/categorias.js";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  SearchX,
  Star,
  Target,
  X,
} from "lucide-react";
import { Form } from "../../components/ui/Form/index.jsx";
import ToDoContext from "../../context/ToDoProvider/ToDoContext.js";
import { Input } from "../../components/ui/Input/index.jsx";
import Switch from "../../components/ui/Switch/index.jsx";
import { Button } from "../../components/ui/Button/index.jsx";
import { SubmetasEtapa } from "../../components/ui/SubmetasEtapa/index.jsx";
import { MetaDetalhes } from "../../components/ui/MetaDetalhes/index.jsx";
import { FILTROS } from "../../utils/filters.js";
import { MetaConcluidaModal } from "../../components/ui/MetaConcluidaModal/index.jsx";
import { ResumoMes } from "../../components/ui/ResumoMes/index.jsx";

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
    filtroProgresso,
    setFiltroProgresso,
    temMetasNoMes,
  } = use(GoalsContext);
  const { openForm } = use(ToDoContext);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div className={styles.titulo}>
          <p className={styles.breadcrumb}>
            Metas <span className={styles.separador}>/</span>{" "}
            <span className={styles.breadcrumbMes}>
              {nomeDoMes(mesSelecionado)} {anoDoMes(mesSelecionado)}
            </span>
          </p>
          <h1 className={styles.tituloPrincipal}>Metas e objetivos</h1>
          <p className={styles.descricao}>
            Acompanhe o que realmente importa neste mês
          </p>
          <span className={styles.tituloBarra} aria-hidden="true" />
        </div>

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

            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <Button type="submit">Próximo</Button>
            </div>
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

      <div className={styles.divProgressoMetas}>
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

        <ResumoMes />
      </div>
      <section className={styles.metasSection}>
        {metaCardsPrincipais.length > 0 && (
          <div className={styles.divDestaque}>
            <h2 className={styles.h2Destaque}>Em destaque</h2>
            <div className={styles.linha}></div>
          </div>
        )}

        {metaCardsPrincipais.length > 0 && (
          <div className={styles.cardsGrid}>
            {metaCardsPrincipais.map((meta) => {
              return (
                <div className={styles.div} key={meta.idMeta}>
                  <GoalsCard key={meta.idMeta} meta={meta} />
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.categorias}>
          <div className={styles.categoriaButtons}>
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
                      filtroCategorias === categoria.id
                        ? "#fff"
                        : categoria.cor,
                  }}
                />
                {categoria.label}
              </button>
            ))}
          </div>

          <div
            className={styles.grupoProgressFilter}
            role="tablist"
            aria-label="Filtrar metas"
          >
            {FILTROS.map((filtro) => (
              <button
                key={filtro.id}
                type="button"
                role="tab"
                className={`${styles.MetaProgressFilter} ${
                  filtro.id === filtroProgresso ? styles.active : ""
                }`}
                onClick={() => setFiltroProgresso(filtro.id)}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        </div>

        {metaCardsPadrao.length > 0 || metaCardsPrincipais.length > 0 ? (
          <div className={styles.cardsGrid}>
            {metaCardsPadrao.map((meta) => (
              <GoalsCard key={meta.idMeta} meta={meta} />
            ))}
          </div>
        ) : (
          <div className={styles.estadoVazio}>
            <div className={styles.estadoVazioIcone}>
              {temMetasNoMes ? <SearchX size={24} /> : <Target size={24} />}
            </div>
            <p className={styles.estadoVazioTitulo}>
              {temMetasNoMes
                ? "Nenhuma meta para esse filtro"
                : "Nenhuma meta criada ainda"}
            </p>
            <p className={styles.estadoVazioTexto}>
              {temMetasNoMes
                ? "Tente outra categoria ou outro status para ver suas metas."
                : "Clique em “+ Nova meta” para definir o foco do mês."}
            </p>
          </div>
        )}
      </section>

      <MetaDetalhes />
      <MetaConcluidaModal />
    </section>
  );
}
