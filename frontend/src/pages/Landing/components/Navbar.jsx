import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/authentication/login");
    }

    const handleJoinClick = () => {
        navigate("/authentication/register");
    }

    return (
        <nav className={styles["navbar"]}>
            <h2>Budget Manager</h2>
            <div className={styles["navbar-buttons"]}>
                <button className={styles["login-btn"]} onClick={handleLoginClick}>Login</button>
                <button className={styles["join-btn"]} onClick={handleJoinClick}>Join</button>
            </div>
        </nav>
    );
};

export default Navbar;