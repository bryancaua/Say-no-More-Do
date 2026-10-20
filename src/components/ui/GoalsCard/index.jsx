import { Star } from "lucide-react";
import { ProgressRing } from "../ProgressRing";
import styles from "./goals_card.module.css";
import { getCategoria } from "../../../utils/categorias";

export function GoalsCard({ meta }) {
  const categoria = getCategoria(meta.categoria);

  return (
    <div className={styles.goalsCard}>
      <ProgressRing
        value={72}
        size={100}
        color={categoria.cor}
        strokeWidth={8}
      />

      <div className={styles.GoalsInfoDiv}>
        {meta.principal === true && (
          <div className={styles.metaCardDestaque}>
            <Star color="white" size={14} />
            <p className={styles.pCategoria} style={{ color: "#fff" }}>
              PRINCIPAL
            </p>
          </div>
        )}
        <p className={styles.pTituloMetas}>{meta.tituloMeta}</p>
        <div
          className={styles.categoria}
          style={{ "--cor-categoria": categoria.cor }}
        >
          <span className={styles.bolinha} />
          <p className={styles.pCategoria}>{categoria.label}</p>
        </div>
      </div>
    </div>
  );
}
