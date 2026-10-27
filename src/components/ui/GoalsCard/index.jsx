import { Star } from "lucide-react";
import { ProgressRing } from "../ProgressRing";
import styles from "./goals_card.module.css";
import { getCategoria } from "../../../utils/categorias";
import GoalsContext from "../../../context/GoalsProvider/GoalsContext";
import { use } from "react";

export function GoalsCard({ meta }) {
  const categoria = getCategoria(meta.categoria);
  const { progressoMeta, contagemSubmetas } = use(GoalsContext);
  const { total, concluidas } = contagemSubmetas(meta);

  return (
    <div className={styles.goalsCard}>
      <ProgressRing
        value={progressoMeta(meta)}
        size={100}
        color={categoria.cor}
        strokeWidth={8}
      />

      <div className={styles.GoalsInfoDiv}>
        {meta.principal === true && (
          <div className={styles.metaCardDestaque}>
            <Star color="white" fill="white" size={12} />
            <p className={styles.pCategoria} style={{ color: "#fff" }}>
              PRINCIPAL
            </p>
          </div>
        )}
        <p className={styles.pTituloMetas}>{meta.tituloMeta}</p>
        <div className={styles.divRodapeMeta}>
          <div
            className={styles.categoria}
            style={{ "--cor-categoria": categoria.cor }}
          >
            <span className={styles.bolinha} />
            <p className={styles.pCategoria}>{categoria.label}</p>
          </div>
          {total > 0 && (
            <p className={styles.pTotalSubmetas}>
              {concluidas} de {total} submetas
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
