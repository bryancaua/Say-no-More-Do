import { use, useEffect, useState } from "react";
import GoalsContext from "./GoalsContext";
import { mesesDisponiveis } from "../../utils/data";
import ToDoContext from "../ToDoProvider/ToDoContext";

export function GoalsProvider({ children }) {
  const { closeForm, lists } = use(ToDoContext);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState();
  const [metaAbertaId, setMetaAbertaId] = useState(null);
  const [filtroCategorias, setFiltroCategorias] = useState("todas");
  const [filtroProgresso, setFiltroProgresso] = useState("andamento");
  const [metaCards, setMetaCards] = useState(() => {
    const savedMeta = localStorage.getItem("meta");
    return savedMeta ? JSON.parse(savedMeta) : [];
  });
  const [indiceMes, setIndiceMes] = useState(0);
  const [etapaMeta, setEtapaMeta] = useState(1);
  const [metaRascunho, setMetaRascunho] = useState(null);
  const [submetasRascunho, setSubmetasRascunho] = useState([]);
  const [metaConcluidaId, setMetaConcluidaId] = useState(null);

  useEffect(() => {
    localStorage.setItem("meta", JSON.stringify(metaCards));
  }, [metaCards]);

  function selecionarCategoria(id) {
    setCategoriaSelecionada(id);
  }

  function avançaMes() {
    setIndiceMes((indiceAtual) => indiceAtual + 1);
  }

  function regrideMes() {
    setIndiceMes((indiceAtual) => indiceAtual - 1);
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

  const contagemSubmetas = (meta) => {
    const submetas = meta.submetas || [];

    const total = submetas.length;
    const concluidas = submetas.filter((submeta) =>
      submetaConcluida(submeta)
    ).length;

    return { total, concluidas };
  };

  const progressoMeta = (meta) => {
    const { total, concluidas } = contagemSubmetas(meta);

    if (total > 0) {
      const metasConcluidasPercent = (concluidas / total) * 100;

      return Math.round(metasConcluidasPercent);
    }

    return meta.progressoManual ?? 0;
  };

  function filtroProgressoMetas(meta) {
    if (filtroProgresso === "arquivadas") return meta.arquivada;
    if (meta.arquivada) return false;

    if (filtroProgresso === "andamento") return progressoMeta(meta) < 100;
    if (filtroProgresso === "concluidas") return progressoMeta(meta) === 100;

    return true;
  }

  const mesSelecionado = mesesDisponiveis()[indiceMes];

  const metaCardsFiltrados = metaCards.filter(
    (meta) =>
      filtroProgressoMetas(meta) &&
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
      celebrada: false,
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
                concluida: !submeta.concluida,
              };
            }

            return submeta;
          }),
        };
      })
    );
  }

  const metaAberta =
    metaCards.find((meta) => meta.idMeta === metaAbertaId) ?? null;

  function abrirMeta(idMeta) {
    setMetaAbertaId(idMeta);
  }

  function fecharMeta() {
    setMetaAbertaId(null);
  }

  function arquivarMeta(idMeta) {
    setMetaCards((prev) =>
      prev.map((meta) =>
        meta.idMeta === idMeta ? { ...meta, arquivada: true } : meta
      )
    );
    fecharMeta();
  }

  function excluirMeta(idMeta) {
    setMetaCards((prev) => prev.filter((meta) => meta.idMeta !== idMeta));
    fecharMeta();
  }

  // atual/total/percentual de UMA submeta (usado no texto e na barrinha do painel)
  const detalhesSubmeta = (submeta) => {
    if (submeta.tipo === "lista") {
      const lista = lists.find((l) => l.id === submeta.listaId);
      const total = lista?.todos.length ?? 0;
      const atual = lista?.todos.filter((t) => t.concluido).length ?? 0;

      return {
        atual,
        total,
        percent: total > 0 ? Math.round((atual / total) * 100) : 0,
        nomeLista: lista?.nome ?? "Lista removida",
      };
    }

    const feito = submeta.concluida ?? false;
    return {
      atual: feito ? 1 : 0,
      total: 1,
      percent: feito ? 100 : 0,
      nomeLista: null,
    };
  };

  function atualizarProgressoManual(idMeta, valor) {
    const progresso = Math.min(100, Math.max(0, Number(valor)));

    setMetaCards((prev) =>
      prev.map((meta) =>
        meta.idMeta === idMeta ? { ...meta, progressoManual: progresso } : meta
      )
    );
  }

  const idParaCelebrar =
    metaCards.find(
      (m) =>
        !m.arquivada &&
        !m.celebrada &&
        progressoMeta(m) === 100
    )?.idMeta ?? null;

  if (idParaCelebrar) {
    setMetaCards((prev) =>
      prev.map((meta) =>
        meta.idMeta === idParaCelebrar ? { ...meta, celebrada: true } : meta
      )
    );
    setMetaConcluidaId(idParaCelebrar);
  }

  const metaConcluida =
    metaCards.find((m) => m.idMeta === metaConcluidaId) ?? null;

  function fecharCelebracao() {
    setMetaConcluidaId(null);
  }

  function arquivarDaCelebracao() {
    arquivarMeta(metaConcluidaId);
    setMetaConcluidaId(null);
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
        contagemSubmetas,
        metaAberta,
        abrirMeta,
        fecharMeta,
        arquivarMeta,
        excluirMeta,
        detalhesSubmeta,
        alternarSubmetaManual,
        atualizarProgressoManual,
        filtroProgressoMetas,
        filtroProgresso,
        setFiltroProgresso,
        metaConcluida,
        fecharCelebracao,
        arquivarDaCelebracao,
      }}
    >
      {children}
    </GoalsContext>
  );
}
