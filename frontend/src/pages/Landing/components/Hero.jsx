import useNavigation from "../../../hooks/useNavigation";
import styles from "./Hero.module.css";

function Hero() {
    const { goToLogin, goToRegister } = useNavigation();

    return (
        <section className={styles["hero"]}>
            <h2>Track Your Expenses with<p className={styles["hero-highlight"]}>Ease</p></h2>
            <p>Manage your finances, track your spending, and save more!</p>
            <div className={styles["hero-buttons"]}>
                <button className={styles["login-btn"]} onClick={goToLogin}>Login</button>
                <button className={styles["get-started-btn"]} onClick={goToRegister}>Get Started</button>
            </div>
        </section>
    );
};

export default Hero;