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
          ? `${styles.aside}`
          : `${styles.aside} ${styles.aside_expanded}`
      }
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <img src={logo} alt="" className={styles.img} />

      <nav className={styles.nav}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <IconButton
            selected={selected}
            collapsed={collapsed}
            id={id}
            key={id}
            onClick={() => setSelected(id)}
          >
            <div className={styles.icon_wrapper}>
              <Icon
                strokeWidth={1.8}
                className={`${
                  selected === id ? styles.icons_selected : styles.icons
                }`}
              />
            </div>
            <p className={`${selected === id ? styles.p_selected : styles.p} ${collapsed ? styles.p_collapsed : ""}`}>
              {label}
            </p>
          </IconButton>
        ))}
      </nav>
    </aside>
  );
}
