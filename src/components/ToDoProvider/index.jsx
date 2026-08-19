import { useState } from "react";
import ToDoContext from "./ToDoContext";

const list = [
  { nome: "estudos", id: crypto.randomUUID(), cor: "#4f46e5" },
  { nome: "vida pessoal", id: crypto.randomUUID(), cor: "#22c55e" },
  { nome: "Academia", id: crypto.randomUUID(), cor: "#ef4444" },
];

export function ToDoProvider({ children }) {
  const [lists, setLists] = useState(list);
  const [selectedList, setSelectedList]= useState(list);
  const [activeForm, setActiveForm] = useState(null)

  function openForm(name) {
    setActiveForm(name);
  }

  function closeForm() {
    setActiveForm(null);
  }

  function alterarCor(id, novaCor) {
    setLists((prev) =>
      prev.map((lista) =>
        lista.id === id ? { ...lista, cor: novaCor } : lista
      )
    );
  }


  function addList(formData) {
    const nome = formData.get("nome");
    const cor = formData.get("cor");
    const id = crypto.randomUUID();
    setLists((prev) => [...prev, { nome, id, cor }]);
    closeForm();
  }

  return (
    <ToDoContext
      value={{
        addList,
        lists,
        closeForm,
        alterarCor,
        openForm,
        selectedList,
        setSelectedList,
        activeForm,
      }}
    >
      {children}
    </ToDoContext>
  );
}
