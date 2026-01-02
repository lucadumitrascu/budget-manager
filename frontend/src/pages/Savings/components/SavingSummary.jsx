import styles from "./SavingSummary.module.css";

const SavingSummary = ({
    currency,
    goals,
    onAddGoal,
    onAddSaving,
}) => {
    const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
    const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);

    return (
        <div className={styles["savings-summary"]}>
            <div></div>
            <h2>
                You saved <strong>{totalSaved} {currency}</strong> out of <strong>{totalTarget} {currency}</strong> total
            </h2>
            <div className={styles["div-buttons"]}>
                <button className={styles["btn-add-goal"]} onClick={onAddGoal}>
                    + Add Goal
                </button>
                <button className={styles["btn-add-saving"]} onClick={onAddSaving}>
                    + Add Saving
                </button>
            </div>
        </div>
    );
}

export default SavingSummary;