import styles from "./card.module.css"

export function Card ({children, style}) {
    return (
        <div className={styles.div} style={style}>
            {children}
        </div>
    )
}