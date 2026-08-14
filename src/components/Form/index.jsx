import styles from "./form.module.css";
import { use } from "react";
import ToDoContext from "../ToDoProvider/ToDoContext";

export function Form({ children, ...rest }) {
  const { addList, isOpen } = use(ToDoContext);

  if(!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <form
        action={addList}
        {...rest}
        className={styles.form}
      >
        {children}
      </form>
    </div>
  );
}
