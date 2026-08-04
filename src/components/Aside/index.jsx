import styles from "./aside.module.css";
import logo from "../../assets/say no more-do logo ofci.png";

import {
  LayoutDashboardIcon,
  CheckSquare,
  Target,
  FlameIcon,
  ChartNoAxesColumn,
} from "lucide-react";
import { useState } from "react";
import { IconButton } from "../IconButton";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { id: "tarefas", label: "Tarefas", icon: CheckSquare },
  { id: "metas", label: "Metas", icon: Target },
  { id: "hábitos", label: "Hábitos", icon: FlameIcon },
  { id: "relatórios", label: "Relatórios", icon: ChartNoAxesColumn },
];

export function Aside() {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState("dashboard");

  return (
    <aside
      className={
        collapsed
          ? `${styles.aside} ${styles.aside_collapsed}`
          : `${styles.aside} ${styles.aside_expanded}`
      }
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <img src={logo} alt="" className={styles.img} />

      <nav className={styles.nav}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <IconButton key={id} onClick={() => setSelected(id)}>
            <div className={styles.icon_wrapper}>
              <Icon
                strokeWidth={1.8}
                className={`${
                  collapsed ? styles.icons : styles.icons_expanded
                } ${selected === id ? styles.selected : ""}`}
              />
            </div>
            <p className={styles.p}>{label}</p>
          </IconButton>
        ))}
      </nav>
    </aside>
  );
}

/*
        <IconButton onClick={() => setSelected(!selected)}>
          <div className={styles.icon_wrapper}>
            <LayoutDashboardIcon
              strokeWidth={1.8}
              className={collapsed ? styles.icons : styles.icons_expanded}
            />
          </div>
          <p className={styles.p}>Dashboard</p>
        </IconButton>

        <IconButton>
          <div className={styles.icon_wrapper}>
            <CheckSquare
              strokeWidth={1.8}
              className={collapsed ? styles.icons : styles.icons_expanded}
            />
          </div>
          <p className={styles.p}>Tarefas</p>
        </IconButton> */
