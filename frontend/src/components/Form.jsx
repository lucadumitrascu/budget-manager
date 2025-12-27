import GoogleLoginButton from "./GoogleLoginButton";
import { PulseLoader } from "react-spinners";
import styles from "./Form.module.css";

const Form = ({
    title = "",
    isAuthForm = true,
    onSubmit,
    primaryButton = { text: "Submit", isLoading: false },
    secondaryButton = { text: "", onClick: null },
    tertiaryButton = { text: "", onClick: null },
    error,
    containsGoogleLoginButton = false,
    children
}) => {
    return (
        <form className={styles["form"]} style={{ padding: isAuthForm ? "1.5rem" : "1rem" }}
            onSubmit={onSubmit}>
            <h2 className={isAuthForm ? "" : styles["centered"]}>{title || primaryButton.text}</h2>
            {children}
            {error && <span className={styles["form-error"]}>{error}</span>}

            <div className={styles["form-buttons"]}>
                {tertiaryButton.text && (
                    <button type="button" className={styles["tertiary-button"]}
                        onClick={tertiaryButton.onClick}
                        style={{ visibility: tertiaryButton.onClick ? "visible" : "hidden" }}
                    >
                        {tertiaryButton.text}
                    </button>
                )}

                <button type="submit" disabled={primaryButton.isLoading}>
                    {primaryButton.isLoading ? <PulseLoader size={6} color="#fff" /> : primaryButton.text}
                </button>

                {secondaryButton.text && secondaryButton.onClick && (
                    <button type="button" className={isAuthForm ? "" : styles["secondary-button"]} onClick={secondaryButton.onClick}>
                        {secondaryButton.text}
                    </button>
                )}
            </div>

            {containsGoogleLoginButton && <GoogleLoginButton />}
        </form >
    );
};

export default Form;
