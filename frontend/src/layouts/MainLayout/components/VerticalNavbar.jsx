import styles from "./VerticalNavbar.module.css";
import useNavigation from "../../../hooks/useNavigation";
import useLogoutUser from "../../../hooks/useLogoutUser";

const VerticalNavbar = () => {
    const {
        goToDashboard, goToExpenses, goToIncomes,
        goToSavings, goToPlanner, goToSettings
    } = useNavigation();
    const logoutUser = useLogoutUser();

    return (
        <div className={styles["vertical-navbar"]}>
            <div className={styles["div-buttons"]}>
                <h1 className={styles["title"]}>Budget Manager</h1>
                <button onClick={goToDashboard}>
                    Dashboard
                </button>
                <button onClick={goToExpenses}>
                    Expenses
                </button>
                <button onClick={goToIncomes}>
                    Incomes
                </button>
                <button onClick={goToSavings}>
                    Savings
                </button>
                <button onClick={goToPlanner}>
                    Planner
                </button>
            </div>
            <div className={styles["div-buttons"]}>
                <button onClick={goToSettings}>
                    Settings
                </button>
                <button className={styles["logout-button"]} onClick={logoutUser}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default VerticalNavbar;
