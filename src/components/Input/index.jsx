import styles from "./input.module.css"

export function Input ({...rest}) {
    return (
        <input {...rest} className={styles.input} />
    )
}