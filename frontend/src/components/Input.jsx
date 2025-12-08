import styles from "./Input.module.css";

const Input = ({ label, id, autoComplete, type = "text", value, maxLength = 255, onChange }) => {
    return (
        <>
            <label className={styles["label"]} htmlFor={id}>{label}</label>
            <input
                className={styles["input"]}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                maxLength={maxLength}
                required
            />
        </>
    );
};

export default Input;