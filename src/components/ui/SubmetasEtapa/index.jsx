import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Flame,
  Hand,
  List,
  Plus,
  X,
} from "lucide-react";
import styles from "../../../pages/Goals/goals.module.css";
import { Input } from "../Input/index.jsx";

export function SubmetasEtapa({
  submetas,
  adicionarSubmeta,
  removerSubmeta,
  voltarParaDadosBasicos,
}) {
  const [tipoSelecionado, setTipoSelecionado] = useState("manual");

  const [dadosSubmeta, setDadosSubmeta] = useState({
    titulo: "",
    data: "",
    habito: "",
    alvoDias: "",
    lista: "",
    alvoTodos: "",
  });

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setDadosSubmeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function limparFormularioSubmeta() {
    setDadosSubmeta({
      titulo: "",
      data: "",
      habito: "",
      alvoDias: "",
      lista: "",
      alvoTodos: "",
    });
  }

  function adicionar() {
    let novaSubmeta;

    if (tipoSelecionado === "manual") {
      if (!dadosSubmeta.titulo.trim()) {
        return;
      }

      novaSubmeta = {
        tipo: "manual",
        titulo: dadosSubmeta.titulo,
        data: dadosSubmeta.data,
      };
    }

    if (tipoSelecionado === "habito") {
      novaSubmeta = {
        tipo: "habito",
        habito: dadosSubmeta.habito,
        alvoDias: dadosSubmeta.alvoDias,
        data: dadosSubmeta.data,
      };
    }

    if (tipoSelecionado === "lista") {
      novaSubmeta = {
        tipo: "lista",
        lista: dadosSubmeta.lista,
        alvoTodos: dadosSubmeta.alvoTodos,
        data: dadosSubmeta.data,
      };
    }

    adicionarSubmeta(novaSubmeta);
    limparFormularioSubmeta();
  }

  return (
    <div className={styles.divMetas}>
      <div className={styles.submetasAdicionadas}>
        <p className={styles.pFormMetas}>
          SUBMETAS ADICIONADAS · {submetas.length}
        </p>

        {submetas.map((submeta) => (
          <div
            className={styles.submetaAdicionada}
            key={submeta.idSubmeta}
          >
            <span>
              {submeta.tipo === "manual" && submeta.titulo}

              {submeta.tipo === "habito" &&
                `Meta de hábito: ${submeta.alvoDias} dias`}

              {submeta.tipo === "lista" &&
                `Meta de lista: ${submeta.alvoTodos} tarefas`}
            </span>

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

          {/* Pomodoro/Foco foi ignorado conforme você pediu */}
        </div>

        {tipoSelecionado === "manual" && (
          <div className={styles.camposSubmeta}>
            <label className={styles.labelSubmeta}>TÍTULO</label>

            <Input
              name="titulo"
              value={dadosSubmeta.titulo}
              onChange={atualizarCampo}
              placeholder="Ex.: Terminar o curso"
            />

            <label className={styles.labelSubmeta}>
              DATA (OPCIONAL)
            </label>

            <Input
              name="data"
              value={dadosSubmeta.data}
              onChange={atualizarCampo}
              placeholder="Ex.: 25 out"
            />
          </div>
        )}

        {tipoSelecionado === "habito" && (
          <div className={styles.camposSubmeta}>
            <label className={styles.labelSubmeta}>
              HÁBITO EXISTENTE
            </label>

            <Input
              name="habito"
              value={dadosSubmeta.habito}
              onChange={atualizarCampo}
              placeholder="Hábitos estarão disponíveis em breve"
              disabled
            />

            <div className={styles.linhaCampos}>
              <div>
                <label className={styles.labelSubmeta}>
                  ALVO (DIAS)
                </label>

                <Input
                  name="alvoDias"
                  type="number"
                  value={dadosSubmeta.alvoDias}
                  onChange={atualizarCampo}
                  placeholder="Ex.: 15"
                  disabled
                />
              </div>

              <div>
                <label className={styles.labelSubmeta}>
                  DATA (OPCIONAL)
                </label>

                <Input
                  name="data"
                  value={dadosSubmeta.data}
                  onChange={atualizarCampo}
                  placeholder="Ex.: 25 out"
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        {tipoSelecionado === "lista" && (
          <div className={styles.camposSubmeta}>
            <label className={styles.labelSubmeta}>
              LISTA DE TAREFAS
            </label>

            <Input
              name="lista"
              value={dadosSubmeta.lista}
              onChange={atualizarCampo}
              placeholder="Selecione uma lista"
            />

            <div className={styles.linhaCampos}>
              <div>
                <label className={styles.labelSubmeta}>
                  ALVO (TO-DOS)
                </label>

                <Input
                  name="alvoTodos"
                  type="number"
                  value={dadosSubmeta.alvoTodos}
                  onChange={atualizarCampo}
                  placeholder="Ex.: 6"
                />
              </div>

              <div>
                <label className={styles.labelSubmeta}>
                  DATA (OPCIONAL)
                </label>

                <Input
                  name="data"
                  value={dadosSubmeta.data}
                  onChange={atualizarCampo}
                  placeholder="Ex.: 25 out"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          className={styles.buttonAdicionarSubmeta}
          onClick={adicionar}
        >
          <Plus size={20} />
          Adicionar
        </button>
      </div>

      <div className={styles.avisoSubmetas}>
        <span>◎</span>
        <p>
          Sem submetas, você controla o progresso por um slider.
        </p>
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