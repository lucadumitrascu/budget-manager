import CardSwitcher from "./components/CardSwitcher";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import styles from "./Landing.module.css";

function Landing() {

    return (
        <div className={styles["landing-page"]}>
            <Navbar />
            <Hero />
            <CardSwitcher />
        </div>
    );
};

export default Landing;