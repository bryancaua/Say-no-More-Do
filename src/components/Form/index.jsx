import { use } from "react";
import ToDoContext from "../ToDoProvider/ToDoContext";

export function Form() {
    const { addList } = use(ToDoContext)

  return <form action={addList}></form>;
}
