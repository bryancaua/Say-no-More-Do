
import styles from "../Aside/aside.module.css";


export function IconButton({collapsed, children}) {


  return (
    <button
      className={`${styles.button} ${collapsed ? styles.button_active : ""}`}>
        {children}
    </button>
  );
}
