import { use, useEffect } from "react";
import {
  Archive,
  CalendarDays,
  Check,
  Copy,
  Flame,
  Hand,
  ListChecks,
  Pencil,
  Timer,
  Trash2,
  X,
} from "lucide-react";
import GoalsContext from "../../../context/GoalsProvider/GoalsContext";
import { ProgressRing } from "../ProgressRing";
import { getCategoria } from "../../../utils/categorias";
import { nomeDoMes, anoDoMes } from "../../../utils/data";
import styles from "./meta_detalhes.module.css";

function tagDaSubmeta(submeta, detalhes) {
  if (submeta.tipo === "manual") return { Icone: Hand, texto: "Manual" };
  if (submeta.tipo === "habito")
    return { Icone: Flame, texto: `Hábito · ${submeta.habito ?? ""}` };
  if (submeta.tipo === "lista")
    return { Icone: ListChecks, texto: `Lista · ${detalhes.nomeLista}` };
  return { Icone: Timer, texto: submeta.tipo };
}

function textoStatus(submeta, detalhes, concluida) {
  if (submeta.tipo === "lista")
    return `${detalhes.atual} de ${detalhes.total} to-dos`;
  if (submeta.tipo === "manual" && concluida) return "Concluída";
  return "";
}

export function MetaDetalhes() {
  const {
    metaAberta: meta,
    fecharMeta,
    progressoMeta,
    contagemSubmetas,
    submetaConcluida,
    detalhesSubmeta,
    alternarSubmetaManual,
    arquivarMeta,
    excluirMeta,
    atualizarProgressoManual,
  } = use(GoalsContext);

  useEffect(() => {
    if (!meta) return;

    function aoTeclar(e) {
      if (e.key === "Escape") fecharMeta();
    }

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [meta, fecharMeta]);

  if (!meta) return null;

  const categoria = getCategoria(meta.categoria);
  const { total, concluidas } = contagemSubmetas(meta);

  function confirmarExclusao() {
    if (window.confirm(`Excluir a meta "${meta.tituloMeta}"?`)) {
      excluirMeta(meta.idMeta);
    }
  }

  return (
    <div className={styles.overlay} onClick={fecharMeta}>
      <aside
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Detalhes da meta ${meta.tituloMeta}`}
      >
        <div className={styles.corpo}>
          <header className={styles.topo}>
            <span
              className={styles.chipCategoria}
              style={{ "--cor-categoria": categoria.cor }}
            >
              <span className={styles.bolinha} />
              {categoria.label}
            </span>

            <button
              type="button"
              className={styles.fechar}
              onClick={fecharMeta}
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
          </header>

          <div className={styles.titulo}>
            <div>
              <p className={styles.eyebrow}>
                {nomeDoMes(meta.mes)} {anoDoMes(meta.mes)}
                {meta.principal && " · Meta principal"}
              </p>
              <h2 className={styles.h2}>{meta.tituloMeta}</h2>
            </div>

            <ProgressRing
              value={progressoMeta(meta)}
              size={90}
              color={categoria.cor}
              strokeWidth={6}
            />
          </div>

          {meta.importancia && (
            <section className={styles.importa}>
              <p className={styles.importaLabel}>POR QUE ISSO IMPORTA</p>
              <p className={styles.importaTexto}>{meta.importancia}</p>
            </section>
          )}

          <section>
            <div className={styles.submetasHeader}>
              <p className={styles.submetasLabel}>SUBMETAS</p>
              {total > 0 && (
                <span className={styles.submetasContagem}>
                  {concluidas} de {total} concluídas
                </span>
              )}
            </div>

            {total === 0 ? (
              <div className={styles.sliderProgresso}>
                <p className={styles.vazio}>
                  Esta meta não tem submetas. Ajuste o progresso manualmente.
                </p>

                <div className={styles.sliderCabecalho}>
                  <label htmlFor="progressoManual">PROGRESSO</label>
                  <span>{meta.progressoManual ?? 0}%</span>
                </div>

                <input
                  id="progressoManual"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={meta.progressoManual ?? 0}
                  onChange={(e) =>
                    atualizarProgressoManual(meta.idMeta, e.target.value)
                  }
                  style={{
                    "--cor-slider": categoria.cor,
                    "--valor": `${meta.progressoManual ?? 0}%`,
                  }}
                />
              </div>
            ) : (
              <ul className={styles.lista}>
                {meta.submetas.map((submeta) => {
                  const concluida = submetaConcluida(submeta);
                  const detalhes = detalhesSubmeta(submeta);
                  const { Icone, texto } = tagDaSubmeta(submeta, detalhes);
                  const manual = submeta.tipo === "manual";

                  return (
                    <li
                      key={submeta.idSubmeta}
                      className={`${styles.submeta} ${
                        submeta.destaque ? styles.submetaDestaque : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`${styles.check} ${
                          concluida ? styles.checkOn : ""
                        }`}
                        disabled={!manual}
                        onClick={() =>
                          alternarSubmetaManual(meta.idMeta, submeta.idSubmeta)
                        }
                        aria-label="Marcar submeta como concluída"
                      >
                        {concluida && <Check size={14} strokeWidth={3} />}
                      </button>

                      <div className={styles.submetaCorpo}>
                        <div className={styles.submetaTopo}>
                          <p
                            className={`${styles.submetaTitulo} ${
                              concluida ? styles.riscado : ""
                            }`}
                          >
                            {submeta.titulo}
                          </p>
                          <span
                            className={`${styles.status} ${
                              concluida ? styles.statusOk : ""
                            }`}
                          >
                            {textoStatus(submeta, detalhes, concluida)}
                          </span>
                        </div>

                        <div className={styles.tags}>
                          <span className={styles.tag}>
                            <Icone size={14} />
                            {texto}
                          </span>

                          {submeta.data && (
                            <span className={styles.prazo}>
                              <CalendarDays size={14} />
                              até {submeta.data}
                            </span>
                          )}
                        </div>

                        <div className={styles.barra}>
                          <div
                            className={`${styles.barraFill} ${
                              concluida ? styles.barraOk : ""
                            }`}
                            style={{ width: `${detalhes.percent}%` }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <footer className={styles.rodape}>
          <div className={styles.rodapeIcons}>
            <button type="button" className={styles.acao}>
              <Pencil size={14} /> Editar
            </button>
            <button type="button" className={styles.acao}>
              <Copy size={14} /> Duplicar p/ próximo mês
            </button>
            <button
              type="button"
              className={styles.acao}
              onClick={() => arquivarMeta(meta.idMeta)}
            >
              <Archive size={14} /> Arquivar
            </button>
          </div>
          <button
            type="button"
            className={`${styles.acao} ${styles.excluir}`}
            onClick={confirmarExclusao}
          >
            <Trash2 size={14} /> Excluir
          </button>
        </footer>
      </aside>
    </div>
  );
}
