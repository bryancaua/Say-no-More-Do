import { use } from "react";
import styles from "./form_header.module.css";
import ToDoContext from "../ToDoProvider/ToDoContext";
import { X } from "lucide-react";

export function FormHeader({children}) {
  const { closeForm } = use(ToDoContext);

  return (
    <div className={styles.div}>
      <h2>{children}</h2>
      <X
        style={{ cursor: "pointer", color: "var(--color-primary)" }}
        size={20}
        onClick={() => closeForm()}
      />
    </div>
  );
}
