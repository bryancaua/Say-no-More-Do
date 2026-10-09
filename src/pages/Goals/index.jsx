import { use } from "react";
import { HeaderTitle } from "../../components/ui/HeaderTitle";
import GoalsContext from "../../context/GoalsProvider/GoalsContext.js";
import { nomeDoMes, anoDoMes } from "../../utils/data.js";
import styles from "./goals.module.css";
import { GoalsCard } from "../../components/ui/GoalsCard/index.jsx";
import { ProgressRing } from "../../components/ui/ProgressRing/index.jsx";
import { getCategoria } from "../../utils/categorias.js";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MES_ATUAL = "2026-10";

export function Goals() {
  const mesSelecionado = MES_ATUAL;
  const { metas } = use(GoalsContext);

  const metasDoMes = metas.filter((m) => m.mes === mesSelecionado);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <HeaderTitle
          title="Metas e objetivos"
          description="Foque no que importa este mês"
        />
        <button className={styles.buttonMeta}>+ Nova meta</button>
      </header>

      <div className={styles.div}>
        <div className={styles.headerMes}>
          <ArrowLeft className={styles.button} />
          <span className={styles.span}>
            {nomeDoMes(mesSelecionado)} {anoDoMes(mesSelecionado)}
          </span>
          <ArrowRight className={styles.button} />
        </div>
      </div>

      <section className={styles.cardsGrid}>
        {metasDoMes.map((metas) => {
          const categoria = getCategoria(metas.categoria);

          return (
            <div className={styles.div} key={metas.id}>
              <GoalsCard>
                <ProgressRing value={72} size={100} color={categoria.cor} strokeWidth={8} />

                <div className={styles.GoalsInfoDiv}>
                  <p className={styles.pTituloMetas}>{metas.titulo}</p>
                  <div
                    className={styles.categoria}
                    style={{ "--cor-categoria": categoria.cor }}
                  >
                    <span className={styles.bolinha} />
                    <p className={styles.pCategoria}>{categoria.label}</p>
                  </div>
                </div>
              </GoalsCard>
            </div>
          );
        })}
      </section>
    </section>
  );
}
