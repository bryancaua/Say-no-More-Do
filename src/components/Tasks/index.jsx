import { Card } from "../Card";
import styles from "./tasks.module.css";

export function Tasks() {
  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Você ainda não possui listas criadas</h1>
          <p className={styles.p}>Organize e conclua o que importa.</p>
        </header>

        <div className={styles.content}>
          <div className={styles.div_lists}>
            <button className={styles.button}></button>
            <button className={styles.button}></button>
            <button className={styles.button}></button>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
      </section>
    </>
  );
}
