import styles from "./switch.module.css";

export default function Switch({ className = "", ...props }) {
  return (
    <span className={`${styles.switch} ${className}`}>
      <input type="checkbox" className={styles.input} {...props} />
      <span className={styles.slider}>
        <svg
          className={styles.icon}
          viewBox="0 0 32 32"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="none" d="m4 16.5 8 8 16-16" />
        </svg>
      </span>
    </span>
  );
}