import styles from "./ProgressBar.module.css";

const ProgressBar = ({
    step = 0,
    totalSteps = 3,
    isAuthPage = true,
}) => {
    const percentage = (totalSteps >= step) ? (step / (totalSteps === 0 ? 1 : totalSteps) * 100) : 0;
    return (
        <>
            <div className={styles["progress-bar"]}>
                <div className={styles["progress"]} style={{ width: `${percentage}%` }}></div>
            </div>
            {isAuthPage &&
                <p className={styles["progress-bar-text"]}>
                    {`Step ${step} of ${totalSteps}`}
                </p>
            }
        </>
    );
};

export default ProgressBar;
