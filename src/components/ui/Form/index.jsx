import styles from "./form.module.css";
import { use } from "react";
import ToDoContext from "../../../context/ToDoProvider/ToDoContext";

export function Form({ children, name, addFunction, variant, className, ...rest }) {
  const { activeForm } = use(ToDoContext);
  
  if(activeForm !== name) return null;

    const formClasses = [
    styles.form,
    variant && styles[`form--${variant}`],
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={styles.overlay}>
      <form
        action={addFunction}
        {...rest}
        className={formClasses}
      >
        {children}
      </form>
    </div>
  );
}
