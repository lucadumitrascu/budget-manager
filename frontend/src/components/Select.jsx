import { CURRENCY_OPTIONS } from "../utils/constants";
import styles from "./Field.module.css";

const Select = ({
    label,
    id,
    options = CURRENCY_OPTIONS,
    value,
    onChange
}) => {
    return (
        <>
            <label className={styles["label"]} htmlFor={id}> {label} </label>
            <select
                className={styles["select"]}
                id={id}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;
