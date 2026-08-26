import { useState } from "react";
import ToDoContext from "./ToDoContext";

const list = [];

export function ToDoProvider({ children }) {
  const [lists, setLists] = useState(list);
  const [selectedList, setSelectedList]= useState(null);
  const [activeForm, setActiveForm] = useState(null);
  //const [toDos, setTodos] = useState(todo);

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
    setLists((prev) => [...prev, { nome, id, cor, todos: [] }]);
    closeForm();
  }
  
  function addTodo(formData) {
    const nomeTodo = formData.get("nomeTodo");
    const prioridade = formData.get("prioridade");
    const idTodo = crypto.randomUUID();
    setLists((prev) => 
      prev.map((list) => 
        list.id === selectedList
        ?  {...list, todos: [...list.todos, {nomeTodo, prioridade, idTodo}]} :
        list
      ))
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
        addTodo,
      }}
    >
      {children}
    </ToDoContext>
  );
}
