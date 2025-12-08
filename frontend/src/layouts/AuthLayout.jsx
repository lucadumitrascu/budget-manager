import styles from "./AuthLayout.module.css";

const AuthLayout = ({ children }) => {
    return (
        <div className={styles["auth-layout"]}>
            <h1 className={styles["title"]}>Budget Manager</h1>
            {children}
        </div>
    );
};

export default AuthLayout;
