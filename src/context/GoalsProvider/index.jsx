import { useState } from "react";
import GoalsContext from "./GoalsContext";

const METAS_INICIAIS = [
  {
    id: crypto.randomUUID(),
    titulo: "Aprender Docker",
    descricao: "",
    importancia: "Quero dominar containers para meu back-end.",
    categoria: "estudos",
    etiquetas: ["docker", "backend"],
    mes: "2026-10",
    principal: true,
    arquivada: false,
    concluidaEm: null,
    progressoManual: 0,
    submetas: [],
  },
    {
    id: crypto.randomUUID(),
    titulo: "Aprender Node.js",
    descricao: "",
    importancia: "Quero dominar containers para meu back-end.",
    categoria: "carreira",
    etiquetas: ["docker", "backend"],
    mes: "2026-10",
    principal: true,
    arquivada: false,
    concluidaEm: null,
    progressoManual: 0,
    submetas: [],
  },
    {
    id: crypto.randomUUID(),
    titulo: "Aprender Next.js",
    descricao: "",
    importancia: "Quero dominar containers para meu back-end.",
    categoria: "saude",
    etiquetas: ["docker", "backend"],
    mes: "2026-10",
    principal: true,
    arquivada: false,
    concluidaEm: null,
    progressoManual: 0,
    submetas: [],
  },
];

export function GoalsProvider({ children }) {
  const [metas, setMetas] = useState(METAS_INICIAIS);

  return (
    <GoalsContext
      value={{
        setMetas,
        metas,
      }}
    >
      {children}
    </GoalsContext>
  );
}
