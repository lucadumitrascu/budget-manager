import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/authentication/login");
    }

    const handleGetStartedClick = () => {
        navigate("/authentication/register");
    }

    return (
        <section className={styles["hero"]}>
            <h2>Track Your Expenses with<p className={styles["hero-highlight"]}>Ease</p></h2>
            <p>Manage your finances, track your spending, and save more!</p>
            <div className={styles["hero-buttons"]}>
                <button className={styles["login-btn"]} onClick={handleLoginClick}>Login</button>
                <button className={styles["get-started-btn"]} onClick={handleGetStartedClick}>Get Started</button>
            </div>
        </section>
    );
};

export default Hero;