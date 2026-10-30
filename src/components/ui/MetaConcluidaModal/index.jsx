import { use, useEffect } from "react";
import confetti from "canvas-confetti";
import { Archive } from "lucide-react";
import GoalsContext from "../../../context/GoalsProvider/GoalsContext.js";
import styles from "./meta_concluida_modal.module.css";

const CORES = ["#6B4FBB", "#9d7cf5", "#e0b72e", "#4b2fa0"];

function dispararConfetes() {
  const fim = Date.now() + 1500;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: CORES,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: CORES,
      zIndex: 9999,
    });

    if (Date.now() < fim) requestAnimationFrame(frame);
  })();
}

export function MetaConcluidaModal() {
  const { metaConcluida, fecharCelebracao, arquivarDaCelebracao } =
    use(GoalsContext);

  const id = metaConcluida?.idMeta;

  useEffect(() => {
    if (id) dispararConfetes();
  }, [id]);

  if (!metaConcluida) return null;

  return (
    <div className={styles.overlay} onClick={fecharCelebracao}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-celebracao"
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.eyebrow}>PARABÉNS</p>
        <h2 id="titulo-celebracao" className={styles.titulo}>
          Meta concluída!
        </h2>

        <div className={styles.anel}>
          <span className={styles.percent}>100%</span>
        </div>

        <h3 className={styles.nomeMeta}>{metaConcluida.tituloMeta}</h3>
        <p className={styles.texto}>Todas as submetas foram concluídas.</p>

        <div className={styles.acoes}>
          <button
            type="button"
            className={styles.botaoSecundario}
            onClick={arquivarDaCelebracao}
          >
            <Archive size={18} />
            Arquivar
          </button>
          <button
            type="button"
            className={styles.botaoPrimario}
            onClick={fecharCelebracao}
          >
            Continuar vendo
          </button>
        </div>
      </div>
    </div>
  );
}
