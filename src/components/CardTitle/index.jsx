import styles from "./card_title.module.css"

export function CardTitle ({ children }) {
    return (
        <div className={styles.div}>
            {children}
        </div>
    )
}