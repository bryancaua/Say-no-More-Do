import { use, useState } from "react";
import { ArrowLeft, Check, Flame, Hand, List, Plus, X } from "lucide-react";
import styles from "../../../pages/Goals/goals.module.css";
import { Input } from "../Input/index.jsx";
import ToDoContext from "../../../context/ToDoProvider/ToDoContext.js";

const ESTADO_INICIAL = {
  titulo: "",
  data: "",
  habito: "",
  alvoDias: "",
  listaId: "",
};

export function SubmetasEtapa({
  submetas,
  adicionarSubmeta,
  removerSubmeta,
  voltarParaDadosBasicos,
}) {
  const { lists } = use(ToDoContext);
  const [tipoSelecionado, setTipoSelecionado] = useState("manual");
  const [dadosSubmeta, setDadosSubmeta] = useState(ESTADO_INICIAL);

  function atualizarCampo(event) {
    const { name, value } = event.target;
    setDadosSubmeta((prev) => ({ ...prev, [name]: value }));
  }

  function selecionarLista(event) {
    const listaId = event.target.value;
    const lista = lists.find((l) => l.id === listaId);

    // sugere o nome da lista como título, mas só se o usuário ainda não digitou nada
    setDadosSubmeta((prev) => ({
      ...prev,
      listaId,
      titulo: prev.titulo.trim() ? prev.titulo : (lista?.nome ?? ""),
    }));
  }

  function limparFormularioSubmeta() {
    setDadosSubmeta(ESTADO_INICIAL);
  }

  function adicionar() {
    const titulo = dadosSubmeta.titulo.trim();

    if (!titulo) return;
    if (tipoSelecionado === "lista" && !dadosSubmeta.listaId) return;

    const base = {
      tipo: tipoSelecionado,
      titulo,
      data: dadosSubmeta.data,
    };

    let novaSubmeta;

    if (tipoSelecionado === "manual") {
      novaSubmeta = { ...base, concluida: false };
    }

    if (tipoSelecionado === "habito") {
      novaSubmeta = {
        ...base,
        habito: dadosSubmeta.habito,
        alvoDias: dadosSubmeta.alvoDias,
      };
    }

    if (tipoSelecionado === "lista") {
      novaSubmeta = { ...base, listaId: dadosSubmeta.listaId };
    }

    adicionarSubmeta(novaSubmeta);
    limparFormularioSubmeta();
  }

  function textoSubmeta(submeta) {
    return submeta.titulo || "Submeta sem nome";
  }

  return (
    <div className={styles.divMetas}>
      <div className={styles.submetasAdicionadas}>
        <p className={styles.pFormMetas}>
          SUBMETAS ADICIONADAS · {submetas.length}
        </p>

        {submetas.map((submeta) => (
          <div className={styles.submetaAdicionada} key={submeta.idSubmeta}>
            <span>{textoSubmeta(submeta)}</span>

            <div className={styles.submetaAcoes}>
              <span className={styles.tagSubmeta}>
                {submeta.tipo === "manual" && (
                  <>
                    <Hand size={15} />
                    Manual
                  </>
                )}

                {submeta.tipo === "habito" && (
                  <>
                    <Flame size={15} />
                    Hábito
                  </>
                )}

                {submeta.tipo === "lista" && (
                  <>
                    <List size={15} />
                    Lista
                  </>
                )}
              </span>

              <button
                type="button"
                className={styles.buttonExcluirSubmeta}
                onClick={() => removerSubmeta(submeta.idSubmeta)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.adicionarSubmeta}>
        <p className={styles.pFormMetas}>ADICIONAR SUBMETA</p>

        <div className={styles.tiposSubmeta}>
          <button
            type="button"
            className={
              tipoSelecionado === "manual"
                ? styles.tipoSubmetaAtivo
                : styles.tipoSubmeta
            }
            onClick={() => setTipoSelecionado("manual")}
          >
            <Hand size={18} />
            Manual
          </button>

          <button
            type="button"
            className={
              tipoSelecionado === "habito"
                ? styles.tipoSubmetaAtivo
                : styles.tipoSubmeta
            }
            onClick={() => setTipoSelecionado("habito")}
          >
            <Flame size={18} />
            Hábito
          </button>

          <button
            type="button"
            className={
              tipoSelecionado === "lista"
                ? styles.tipoSubmetaAtivo
                : styles.tipoSubmeta
            }
            onClick={() => setTipoSelecionado("lista")}
          >
            <List size={18} />
            Lista
          </button>
        </div>

        <div className={styles.camposSubmeta}>
          <label className={styles.labelSubmeta}>TÍTULO</label>

          <Input
            name="titulo"
            value={dadosSubmeta.titulo}
            onChange={atualizarCampo}
            placeholder={
              tipoSelecionado === "lista"
                ? "Ex.: Concluir os estudos de Docker"
                : "Ex.: Terminar o curso"
            }
          />

          <label className={styles.labelSubmeta}>DATA (OPCIONAL)</label>

          <Input
            name="data"
            value={dadosSubmeta.data}
            onChange={atualizarCampo}
            placeholder="Ex.: 25 out"
          />
        </div>

        {tipoSelecionado === "habito" && (
          <div className={styles.camposSubmeta}>
            <label className={styles.labelSubmeta}>HÁBITO EXISTENTE</label>

            <Input
              name="habito"
              value={dadosSubmeta.habito}
              onChange={atualizarCampo}
              placeholder="Hábitos estarão disponíveis em breve"
              disabled
            />

            <label className={styles.labelSubmeta}>ALVO (DIAS)</label>

            <Input
              name="alvoDias"
              type="number"
              value={dadosSubmeta.alvoDias}
              onChange={atualizarCampo}
              placeholder="Ex.: 15"
              disabled
            />
          </div>
        )}

        {tipoSelecionado === "lista" && (
          <div className={styles.camposSubmeta}>
            <label className={styles.labelSubmeta}>LISTA DE TAREFAS</label>

            <select
              name="listaId"
              value={dadosSubmeta.listaId}
              onChange={selecionarLista}
            >
              <option value="">Selecione uma lista</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="button"
          className={styles.buttonAdicionarSubmeta}
          onClick={adicionar}
          disabled={!dadosSubmeta.titulo.trim()}
        >
          <Plus size={20} />
          Adicionar
        </button>
      </div>

      <div className={styles.avisoSubmetas}>
        <span>◎</span>
        <p>Sem submetas, você controla o progresso por um slider.</p>
      </div>

      <div className={styles.footerForm}>
        <button
          type="button"
          className={styles.buttonVoltar}
          onClick={voltarParaDadosBasicos}
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <button type="submit" className={styles.buttonCriarMeta}>
          <Check size={18} />
          Criar meta
        </button>
      </div>
    </div>
  );
}