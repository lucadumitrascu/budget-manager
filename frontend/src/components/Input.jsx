import styles from "./Field.module.css";

const Input = ({ label, id, autoComplete = "off", type = "text", maxLength = 255, placeholder = "", value, onChange, ...rest }) => {
    return (
        <>
            <label className={styles["label"]} htmlFor={id}>{label}</label>
            <input
                className={styles["input"]}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                maxLength={maxLength}
                required
                {...rest}
            />
        </>
    );
};

export default Input;