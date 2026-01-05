import { useState } from "react";
import styles from "./SettingsItem.module.css";
import { CURRENCY_OPTIONS } from "../../../utils/constants";

const SettingsItem = ({ label, id, value, onChange, onSave }) => {
    const [isEditable, setIsEditable] = useState(false);

    const toggleEditableState = () => {
        setIsEditable(!isEditable);
    }

    const handleSaveField = () => {
        toggleEditableState();
        onSave();
    }

    return (
        <>
            <div className={styles["settings-item"]}>
                <label htmlFor={id}>{label}</label>
                <div className={styles["editable-field"]}>
                    {id === "currency" ? (
                        <select id={id} value={value} onChange={onChange} disabled={!isEditable}>
                            {CURRENCY_OPTIONS.map((c) => (
                                <option key={c.value} value={c.value}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input id={id} type={id === "budget" ? "number" : "text"}
                            maxLength={id === "username" ? 50 : undefined}
                            value={value} onChange={onChange}
                            disabled={!isEditable}
                        />
                    )}
                </div>
                <button type="button"
                    className={`${styles["edit-button"]} ${isEditable ? styles["save-button"] : ""}`}
                    onClick={isEditable ? handleSaveField : toggleEditableState}
                >
                    {isEditable ? "Save" : "Edit"}
                </button>
            </div>
            <hr className={styles["divider"]} />
        </>
    );
};

export default SettingsItem;
