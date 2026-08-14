import styles from "../Aside/aside.module.css";

export function IconButton({collapsed, children, selected, id, onClick}) {

  return (
    <button
      onClick={onClick}
      className={`${collapsed ? styles.button : styles.button} ${selected === id ? styles.selected : ""}`}>
        <span className={`${selected === id ? styles.span : ""}`}/>
        {children}
    </button>
  );
}
