import styles from "./input.module.css";

export function Input({ className, variant, ...rest }) {
    
  const inputClasses = [
    styles.input,
    variant && styles[`input--${variant}`],
    className,
  ].filter(Boolean).join(" ");

  return <input {...rest} className={inputClasses} />
}
