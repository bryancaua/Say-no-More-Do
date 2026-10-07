import styles from "./header_title.module.css";

export function HeaderTitle({ title, description }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>{title}</h1>

      {description && (
        <p className={styles.p}>{description}</p>
      )}
    </header>
  );
}
