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
  { id: "habitos", label: "Hábitos", icon: FlameIcon },
  { id: "relatorios", label: "Relatórios", icon: ChartNoAxesColumn },
];

export function Aside() {
  const [collapsed, setCollapsed] = useState(true);

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
        {navItems.map(({ id, icon, label }) => (
          <IconButton
          key={id}
          id={id}
          label={label}
          Icon={icon}
          collapsed={collapsed}
          >
          </IconButton>
        ))}
      </nav>
    </aside>
  );
}
