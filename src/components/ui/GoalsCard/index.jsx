import styles from "./goals_card.module.css"

export function GoalsCard({ children }) {
    return (
        <div className={styles.goalsCard}>
            {children}
        </div>
    )
}