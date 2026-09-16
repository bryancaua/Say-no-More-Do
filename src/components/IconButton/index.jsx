import {NavLink } from "react-router";
import styles from "../Aside/aside.module.css";

export function IconButton({ collapsed, id, label, Icon }) {

  return (
    <NavLink
      to={`/${id}`}
      className={({ isActive }) => `${collapsed ? styles.button : styles.button} ${isActive ? styles.selected : ''}`}>
      {({ isActive }) => (
        <>
          <span className={isActive ? styles.span : ""} />
          <div className={styles.icon_wrapper}>
            <Icon
              strokeWidth={1.8}
              className={isActive ? styles.icons_selected : styles.icons}
            />
          </div>
          <p
            className={`${isActive ? styles.p_selected : styles.p} ${
              collapsed ? styles.p_collapsed : ""
            }`}
          >
            {label}
          </p>
        </>
      )}
    </NavLink>
  );
}
