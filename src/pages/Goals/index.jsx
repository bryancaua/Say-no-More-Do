import { use } from "react";
import { HeaderTitle } from "../../components/ui/HeaderTitle";
import GoalsContext from "../../context/GoalsProvider/GoalsContext.js";
import { nomeDoMes, anoDoMes } from "../../utils/data.js";
import styles from "./goals.module.css";

const MES_ATUAL = "2026-10";

export function Goals() {
  const mesSelecionado = MES_ATUAL;
  const { metas } = use(GoalsContext);

  const metasDoMes = metas.filter((m) => m.mes === mesSelecionado);

  return (
    <section className={styles.section}>
      <HeaderTitle
        title="Metas e objetivos"
        description="Foque no que importa este mês"
      />

      <div className={styles.div}>
        <button>←</button>
        <span className={styles.span}>
          {nomeDoMes(mesSelecionado)} {anoDoMes(mesSelecionado)}
        </span>
        <button>→</button>
      </div>
      
      {metasDoMes.map((metas) => (
        <div key={metas.id}>{metas.titulo}</div>
      ))}
    </section>
  );
}
