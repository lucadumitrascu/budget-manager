import styles from "./AuthForm.module.css";

const AuthForm = ({
    title = "",
    onSubmit,
    primaryButtonText = "Login",
    secondaryButtonText = "",
    onSecondaryButtonClick,
    error,
    children
}) => {
    return (
        <form className={styles["auth-form"]} onSubmit={onSubmit} method="POST">
            <h2>{title ? title : primaryButtonText}</h2>
            {children}
            <span className={styles["auth-error"]}>{error}</span>
            <div className={styles["auth-buttons"]}>
                <button type="submit">{primaryButtonText}</button>

                {secondaryButtonText && (
                    <button type="button" onClick={onSecondaryButtonClick}>
                        {secondaryButtonText}
                    </button>
                )}
            </div>
        </form>
    );
};

export default AuthForm;