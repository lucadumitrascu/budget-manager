import useNavigation from "../../../hooks/useNavigation";
import styles from "./Navbar.module.css";

function Navbar() {
    const { goToLogin, goToRegister } = useNavigation();

    return (
        <nav className={styles["navbar"]}>
            <h2>Budget Manager</h2>
            <div className={styles["navbar-buttons"]}>
                <button className={styles["login-btn"]} onClick={goToLogin}>Login</button>
                <button className={styles["join-btn"]} onClick={goToRegister}>Join</button>
            </div>
        </nav>
    );
};

export default Navbar;