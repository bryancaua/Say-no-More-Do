import { useState } from "react";
import ToDoContext from "./ToDoContext";

const list = [
  { nome: "estudos", id: crypto.randomUUID(), cor: "#4f46e5" },
  { nome: "vida pessoal", id: crypto.randomUUID(), cor: "#22c55e" },
  { nome: "Academia", id: crypto.randomUUID(), cor: "#ef4444" },
];

export function ToDoProvider({ children }) {
  const [lists, setLists] = useState(list);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  function alterarCor(id, novaCor) {
    setLists((prev) =>
      prev.map((lista) =>
        lista.id === id ? { ...lista, cor: novaCor } : lista
      )
    );
  }

  function openForm() {
    setIsOpen(true);
  }

  function closeForm() {
    setIsClosed(false);
  }

  function addList(formData) {
    const titulo = formData.get("titulo");
    const corInicial = formData.get("cor");
    const id = crypto.randomUUID();
    setLists((prev) => [...prev, { id, titulo, corInicial }]);
  }

  return (
    <ToDoContext
      value={{
        addList,
        lists,
        isOpen,
        isClosed,
        closeForm,
        alterarCor,
        openForm
      }}
    >
      {children}
    </ToDoContext>
  );
}
