import styles from "./progress_ring.module.css";

const VIEWBOX = 100; // unidades internas, independentes do tamanho real em px

export function ProgressRing({
  value = 20,
  size = 150,
  strokeWidth = 12,
  color = "#4F7FE0",
}) {
  const progress = Math.min(100, Math.max(0, Math.round(value)));

  // strokeWidth é dado em px, então converte para a escala do viewBox
  const stroke = (strokeWidth / size) * VIEWBOX;
  const center = VIEWBOX / 2;
  const radius = (VIEWBOX - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={styles.ring}
      style={{
        "--ring-size": `${size}px`,
        "--ring-color": color,
      }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progresso: ${progress}%`}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className={styles.svg}
      >
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className={styles.bar}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.value}>{progress}%</span>
    </div>
  );
}