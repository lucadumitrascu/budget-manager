import styles from "./VerticalNavbar.module.css";
import useNavigation from "../../../hooks/useNavigation";

const VerticalNavbar = () => {
    const { goToDashboard, goToExpenses } = useNavigation();

    return (
        <div className={styles["vertical-navbar"]}>
            <div className={styles["div-buttons"]}>
                <h1 className={styles["title"]}>Budget Manager</h1>
                <button className={styles["button"]} onClick={goToDashboard}>
                    Dashboard
                </button>
                <button className={styles["button"]} onClick={goToExpenses}>
                    Expenses
                </button>
            </div>
            <div className={styles["div-buttons"]}>
                <button className={styles["logout-button"]}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default VerticalNavbar;
