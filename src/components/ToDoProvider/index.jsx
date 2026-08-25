import { useState } from "react";
import ToDoContext from "./ToDoContext";

const list = [
  { nome: "vida pessoal", id: crypto.randomUUID(), cor: "#b5c623" },
  { nome: "Academia", id: crypto.randomUUID(), cor: "#a01ab2" },
];

  const todo = [];

export function ToDoProvider({ children }) {
  const [lists, setLists] = useState(list);
  const [selectedList, setSelectedList]= useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [toDos, setTodos] = useState(todo)

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
  
  function addTodo(formData) {
    const nomeTodo = formData.get("nomeTodo");
    const prioridade = formData.get("prioridade");
    const idTodo = crypto.randomUUID();
    setTodos((prev) => [...prev, {nomeTodo, prioridade, idTodo}]);
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
        toDos,
        addTodo,
      }}
    >
      {children}
    </ToDoContext>
  );
}
