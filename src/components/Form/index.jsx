import styles from "./form.module.css";
import { use } from "react";
import ToDoContext from "../ToDoProvider/ToDoContext";

export function Form({ children, name, addFunction, ...rest}) {
  const { activeForm } = use(ToDoContext);
  
  if(activeForm !== name) return null;

  return (
    <div className={styles.overlay}>
      <form
        action={addFunction}
        {...rest}
        className={styles.form}
      >
        {children}
      </form>
    </div>
  );
}
