import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./PasswordInput.module.css";
import inputStyles from "../../../components/Input.module.css";

const PasswordInput = ({
    label = "Password",
    id = "password",
    value,
    onChange,
    autoComplete = "current-password"
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleForgotPasswordClick = () => {
        navigate("/authentication/forgot-password");
    };

    return (
        <>
            <label className={styles["label-password"]} htmlFor={id}>
                <p>{label}</p>
                <button onClick={handleForgotPasswordClick}>
                    Forgot Password?
                </button>
            </label>
            <div className={styles["password-container"]}>
                <input
                    id={id}
                    className={`${styles["password-input"]} ${inputStyles["input"]}`}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    maxLength={60}
                    required
                />
                <span
                    className={styles["password-icon"]}
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
        </>
    );
};


export default PasswordInput;
