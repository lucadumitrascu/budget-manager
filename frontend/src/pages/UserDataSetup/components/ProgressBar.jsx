import { PROGRESS_TOTAL_STEPS } from "../../../utils/constants";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({
    step = 0,
}) => {
    const percentage = step / PROGRESS_TOTAL_STEPS * 100;

    return (
        <>
            <div className={styles["progress-bar"]}>
                <div className={styles["progress"]} style={{ width: `${percentage}%` }}></div>
            </div>
            <p className={styles["progress-bar-text"]}>
                {`Step ${step} of ${PROGRESS_TOTAL_STEPS}`}
            </p>
        </>
    );
};

export default ProgressBar;
