import { use, useState } from "react";
import GoalsContext from "./GoalsContext";
import { mesesDisponiveis } from "../../utils/data";
import ToDoContext from "../ToDoProvider/ToDoContext";

export function GoalsProvider({ children }) {
  const { closeForm } = use(ToDoContext);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState();
  const [filtroCategorias, setFiltroCategorias] = useState("todas");
  const [metaCards, setMetaCards] = useState([]);
  const [indiceMes, setIndiceMes] = useState(0);

  const [etapaMeta, setEtapaMeta] = useState(1);
  const [metaRascunho, setMetaRascunho] = useState(null);
  const [submetasRascunho, setSubmetasRascunho] = useState([]);

  function selecionarCategoria(id) {
    setCategoriaSelecionada(id);
  }

  function avançaMes() {
    setIndiceMes((indiceAtual) => indiceAtual + 1);
  }

  function regrideMes() {
    setIndiceMes((indiceAtual) => indiceAtual - 1);
  }

  const mesSelecionado = mesesDisponiveis()[indiceMes];

  const metaCardsFiltrados = metaCards.filter(
    (meta) =>
      (filtroCategorias === "todas" ||
        meta.categoria === filtroCategorias) &&
      meta.mes === mesSelecionado
  );

  const metaCardsPrincipais = metaCardsFiltrados.filter(
    (meta) => meta.principal
  );

  const metaCardsPadrao = metaCardsFiltrados.filter(
    (meta) => !meta.principal
  );

  function irParaSubmetas(formData) {
    const tituloMeta = formData.get("tituloMeta");
    const descricao = formData.get("descricaoMeta");
    const importancia = formData.get("importancia");
    const mes = formData.get("mes");
    const principal = formData.has("principal");

    const novaMetaRascunho = {
      tituloMeta,
      descricao,
      importancia,
      categoria: categoriaSelecionada,
      mes,
      principal,
      arquivada: false,
      concluidaEm: null,
      progressoManual: 0,
    };

    setMetaRascunho(novaMetaRascunho);
    setEtapaMeta(2);
  }

  function voltarParaDadosBasicos() {
    setEtapaMeta(1);
  }

  function adicionarSubmeta(submeta) {
    const novaSubmeta = {
      ...submeta,
      idSubmeta: crypto.randomUUID(),
    };

    setSubmetasRascunho((prev) => [...prev, novaSubmeta]);
  }

  function removerSubmeta(idSubmeta) {
    setSubmetasRascunho((prev) =>
      prev.filter((submeta) => submeta.idSubmeta !== idSubmeta)
    );
  }

  function finalizarMeta() {
    if (!metaRascunho) {
      return;
    }

    const novaMeta = {
      ...metaRascunho,
      idMeta: crypto.randomUUID(),
      submetas: submetasRascunho,
    };

    setMetaCards((prev) => [...prev, novaMeta]);

    setMetaRascunho(null);
    setSubmetasRascunho([]);
    setEtapaMeta(1);
    setCategoriaSelecionada();

    closeForm();
  }

  function cancelarCriacaoMeta() {
    setMetaRascunho(null);
    setSubmetasRascunho([]);
    setEtapaMeta(1);
    setCategoriaSelecionada();

    closeForm();
  }

  return (
    <GoalsContext
      value={{
        mesSelecionado,
        selecionarCategoria,
        categoriaSelecionada,
        metaCards,
        filtroCategorias,
        setFiltroCategorias,
        metaCardsPrincipais,
        metaCardsPadrao,
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
      }}
    >
      {children}
    </GoalsContext>
  );
}