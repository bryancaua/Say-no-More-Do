import { use, useState } from "react";
import GoalsContext from "./GoalsContext";
import { mesesDisponiveis } from "../../utils/data";
import ToDoContext from "../ToDoProvider/ToDoContext";

export function GoalsProvider({ children }) {
  const { closeForm, lists } = use(ToDoContext);

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
      (filtroCategorias === "todas" || meta.categoria === filtroCategorias) &&
      meta.mes === mesSelecionado
  );

  const metaCardsPrincipais = metaCardsFiltrados.filter(
    (meta) => meta.principal
  );

  const metaCardsPadrao = metaCardsFiltrados.filter((meta) => !meta.principal);

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

  const submetaConcluida = (submeta) => {
    if (submeta.tipo === "lista") {
      const listaRelacionada = lists.find(
        (lista) => lista.id === submeta.listaId
      );

      if (!listaRelacionada) {
        return false;
      }

      if (listaRelacionada.todos.length === 0) {
        return false;
      }

      const toDosConcluidos = listaRelacionada.todos.filter(
        (t) => t.concluido
      ).length;

      const listaFinalizada = toDosConcluidos === listaRelacionada.todos.length;

      return listaFinalizada;
    }

    return submeta.concluida ?? false;
  };

  function alternarSubmetaManual(idMeta, idSubmeta) {
    setMetaCards((prev) =>
      prev.map((meta) => {
        if (meta.idMeta !== idMeta) {
          return meta;
        }

        return {
          ...meta,
          submetas: meta.submetas.map((submeta) => {
            if (submeta.idSubmeta === idSubmeta) {
              return {
                ...submeta,
                concluida: !submeta.concluida
              };
            }

            return submeta;
          }),
        };
      })
    );
  }

  const contagemSubmetas = (meta) => {
  const submetas = meta.submetas || []

  const total = submetas.length;
  const concluidas = submetas.filter((submeta) => submetaConcluida(submeta)).length;

  return { total, concluidas };
};

  const progressoMeta = (meta) => {
    const { total, concluidas } = contagemSubmetas(meta);

    if (total > 0) {
      const metasConcluidasPercent = (concluidas / total)*100;

      return Math.round(metasConcluidasPercent);
    }

    return meta.progressoManual?? 0;
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
        submetaConcluida,
        progressoMeta,
        contagemSubmetas
      }}
    >
      {children}
    </GoalsContext>
  );
}
