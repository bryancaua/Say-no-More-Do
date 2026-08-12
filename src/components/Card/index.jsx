import styles from "./card.module.css"

export function Card ({children}) {
    return (
        <ul className={styles.div}>
            {children}
        </ul>
    )
}