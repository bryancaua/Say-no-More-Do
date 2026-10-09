import styles from "./progress_ring.module.css";

export function ProgressRing({
  value = 20,
  size = 150,
  strokeWidth = 12,
  color = "#4F7FE0",
}) {
  const progress = Math.min(100, Math.max(0, Math.round(value)));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={styles.ring}
      style={{ width: size, height: size, "--ring-color": color }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progresso: ${progress}%`}
    >
      <svg width={size} height={size} className={styles.svg}>
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.bar}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.value}>{progress}%</span>
    </div>
  );
}