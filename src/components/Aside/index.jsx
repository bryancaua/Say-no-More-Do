import styles from "./aside.module.css";
import logo from "../../assets/say no more-do logo ofci.png";

import { LayoutDashboardIcon, CheckSquare } from "lucide-react";
import { useState } from "react";

export function Aside() {
  const [collapsed, setCollapsed] = useState(true);

  console.log(collapsed)

  return (
    <aside
      className={
        collapsed
          ? `${styles.aside} ${styles.aside_collapsed}`
          : `${styles.aside} ${styles.aside_expanded}`
      }
    >
      <img src={logo} alt="" className={styles.img} />

      <nav className={styles.nav}>
        <button className={styles.button}>
          <LayoutDashboardIcon
            size={23}
            strokeWidth={1.8}
            color="grey"
            className={styles.icons}
          />
        </button>

        <button className={styles.button}>
          <CheckSquare
            size={23}
            strokeWidth={1.8}
            color="grey"
            className={styles.icons}
          />
        </button>
      </nav>
    </aside>
  );
}
