import { use } from "react";
import GoalsContext from "../../../context/GoalsProvider/GoalsContext";
import { diasRestantesMes, nomeDoMes } from "../../../utils/data";
import { ProgressRing } from "../ProgressRing";
import styles from "./resumo_mes.module.css";

export function ResumoMes() {
  const { mesSelecionado, metaCards, progressoMeta } = use(GoalsContext);

  const metasDoMes = metaCards.filter(
    (meta) => meta.mes === mesSelecionado && !meta.arquivada
  );

  const totalMetas = metasDoMes.length;
  const metasConcluidas = metasDoMes.filter(
    (meta) => progressoMeta(meta) === 100
  ).length;

  const porcentagemConcluida =
    totalMetas > 0 ? Math.round((metasConcluidas / totalMetas) * 100) : 0;

  let mensagem = "Crie uma meta para começar o mês.";
  if (totalMetas > 0) {
    if (porcentagemConcluida === 100) mensagem = "Mês completo, parabéns!";
    else if (porcentagemConcluida >= 50) mensagem = "Você está no caminho certo.";
    else mensagem = "Ainda dá tempo, continue avançando.";
  }

  return (
    <div className={styles.grid}>
      <article className={`${styles.card} ${styles.cardProgresso}`}>
        <div className={styles.anel}>
          <ProgressRing
            value={porcentagemConcluida}
            size={100}
            color="#6b4fbb"
            strokeWidth={8}
          />
        </div>

        <div>
          <p className={styles.label}>PROGRESSO DO MÊS</p>
          <p className={styles.mensagem}>{mensagem}</p>
        </div>
      </article>

      <article className={styles.card}>
        <p className={styles.label}>DIAS RESTANTES</p>
        <p className={styles.numero}>{diasRestantesMes(mesSelecionado)}</p>
        <p className={styles.sub}>até o final de {nomeDoMes(mesSelecionado)}</p>
      </article>

      <article className={styles.card}>
        <p className={styles.label}>METAS CONCLUÍDAS</p>
        <p className={styles.numero}>
          {metasConcluidas} <span className={styles.de}>de {totalMetas}</span>
        </p>

        <div className={styles.barra}>
          <div
            className={styles.barraFill}
            style={{ width: `${porcentagemConcluida}%` }}
          />
        </div>
      </article>
    </div>
  );
}