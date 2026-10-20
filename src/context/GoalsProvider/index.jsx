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


  function selecionarCategoria(id) {
    setCategoriaSelecionada(id);
  }

  function avançaMes() {
    setIndiceMes(indiceMes + 1);
  }

  function regrideMes() {
    setIndiceMes(indiceMes - 1);
  }
   
  const mesSelecionado = mesesDisponiveis()[indiceMes];

  const metaCardsFiltrados = metaCards.filter(
    (meta) =>
      (filtroCategorias === "todas" || meta.categoria === filtroCategorias) && meta.mes === mesSelecionado
  );

  const metaCardsPrincipais = metaCardsFiltrados.filter((meta) => meta.principal);
  const metaCardsPadrao = metaCardsFiltrados.filter((meta) => !meta.principal);

  function addMeta(formData) {
    const tituloMeta = formData.get("tituloMeta");
    const descricao = formData.get("descricaoMeta");
    const importancia = formData.get("importancia");
    const categoria = categoriaSelecionada;
    const idMeta = crypto.randomUUID();
    const principal = formData.has("principal");
    const mes = formData.get("mes");

    setMetaCards((prev) => 
      [...prev, { tituloMeta, descricao, importancia, categoria, idMeta, principal, arquivada: false, concluidaEm: null, progressoManual: 0, submetas: [], mes}]
    );

    closeForm();
  }

  return (
    <GoalsContext
      value={{
        mesSelecionado,
        selecionarCategoria,
        categoriaSelecionada,
        metaCards,
        addMeta,
        filtroCategorias,
        setFiltroCategorias,
        metaCardsPrincipais,
        metaCardsPadrao,
        avançaMes,
        indiceMes,
        regrideMes,
      }}
    >
      {children}
    </GoalsContext>
  );
}
