import { useEffect, useState } from "react";
import ToDoContext from "./ToDoContext";


export function ToDoProvider({ children }) {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("lists");
    return savedLists ? JSON.parse(savedLists) : []
  });
  const [selectedList, setSelectedList] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("todas");
  const [descriptionChange, setDescriptionChange] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  function handleClickLists(id) {
    setSelectedList(id);
    setSelectedFilter("todas");
    setMensagemFiltro("");
  }

  function abreDescricao() {
    setDescriptionChange(!descriptionChange)
    setIsRotated(!isRotated)
  }

  function handleClickDelete(id) {
    const novasListas = lists.filter(list => list.id !== id);
    setLists(novasListas)
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists))
  }, [lists])

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

  function atualizaDescricao(id, descricao) {
    setLists((prev) =>
      prev.map((lista) => 
        lista.id === id ? {...lista, descricao: descricao} : lista
      )
  )
  }

  function addList(formData) {
    const nome = formData.get("nome");
    const cor = formData.get("cor");
    const id = crypto.randomUUID();
    setLists((prev) => [...prev, { nome, id, cor, todos: [], descricao: "" }]);
    closeForm();
  }

  function addTodo(formData) {
    const nomeTodo = formData.get("nomeTodo");
    const prioridade = formData.get("prioridade");
    const idTodo = crypto.randomUUID();
    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedList
          ? {
              ...list,
              todos: [
                ...list.todos,
                { nomeTodo, prioridade, idTodo, concluido: false },
              ],
            }
          : list
      )
    );
    closeForm();
  }

  const prioridadesTodo = {
    Alta: 1,
    Média: 2,
    Baixa: 3,
  };

  const prioridadesCoresTodo = {
    Alta: "#ef4444",
    Média: "#f59e0b",
    Baixa: "#22c55e",
  };

  const listaAtual = lists.find((lista) => lista.id === selectedList);

  const toDosOrdenados = listaAtual
    ? listaAtual.todos.sort((a, b) => {
        return prioridadesTodo[a.prioridade] - prioridadesTodo[b.prioridade];
      })
    : [];

  function completeTodo(idTodo) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedList
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.idTodo === idTodo
                  ? { ...todo, concluido: !todo.concluido }
                  : todo
              ),
            }
          : list
      )
    );
  }

  const hasLists = lists.length > 0;
  const hasSelection = Boolean(listaAtual);

  const totalTodos = listaAtual ? listaAtual.todos.length : 0;
  const todosConcluidos = listaAtual
    ? listaAtual.todos.filter((t) => t.concluido).length
    : 0;
  const porcentagem =
    totalTodos === 0 ? 0 : (todosConcluidos / totalTodos) * 100;

  const filterTodos = toDosOrdenados.filter((todo) => {
    if (selectedFilter === "todas") return true;
    if (selectedFilter === "pendentes") return !todo.concluido;
    if (selectedFilter === "concluidas") return todo.concluido;
  })

const [mensagemFiltro, setMensagemFiltro] = useState("");

function atualizaFiltro(filterParam) {
  setSelectedFilter(filterParam);

  if (filterParam === "concluidas") {
    const concluidasCount = listaAtual?.todos.filter(t => t.concluido).length;
    setMensagemFiltro(concluidasCount === 0 ? "Nenhuma tarefa concluída" : "");
  }

  if (filterParam === "pendentes") {
    const pendentesCount = listaAtual?.todos.filter(t => !t.concluido).length;
    setMensagemFiltro(pendentesCount === 0 ? "Nenhuma tarefa pendente" : "");
  }

  if (filterParam === "todas") {
    setMensagemFiltro(null);
  }
}

  return (
    <ToDoContext
      value={{
        addList,
        lists,
        closeForm,
        alterarCor,
        atualizaDescricao,
        openForm,
        selectedList,
        activeForm,
        addTodo,
        completeTodo,
        toDosOrdenados,
        prioridadesCoresTodo,
        hasLists,
        hasSelection,
        porcentagem,
        totalTodos,
        listaAtual,
        todosConcluidos,
        selectedFilter,
        filterTodos,
        abreDescricao,
        isRotated,
        descriptionChange,
        handleClickDelete,
        atualizaFiltro,
        mensagemFiltro,
        handleClickLists
      }}
    >
      {children}
    </ToDoContext>
  );
}
