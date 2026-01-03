import { useDispatch } from "react-redux";
import { deleteGoalAction } from "../../../redux/slices/goalsSlice";
import { deleteGoal } from "../../../services/goalService";
import { deleteSavingsByGoalAction } from "../../../redux/slices/savingsSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { setSelectedGoalIdAction } from "../../../redux/slices/plannerSlice";
import { isWithinNumericLimits } from "../../../utils/validation";
import { withdrawFundsFromGoal } from "../../../services/goalService";
import { withdrawFundsFromGoalAction } from "../../../redux/slices/goalsSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { showSuccessToast } from "../../../utils/toast";
import { FaRegSadTear } from "react-icons/fa";
import {
    MdSentimentDissatisfied,
    MdSentimentSatisfied,
    MdSentimentVerySatisfied,
} from "react-icons/md";
import styles from "./GoalCard.module.css";

const GoalCard = ({
    budget,
    currency,
    goal,
    savings,
    isExpanded,
    onExpandToggle,
    onEditGoal,
    token,
}) => {
    const dispatch = useDispatch();
    const goalProgress = goal.targetAmount === 0 ? 0 : (goal.currentAmount / goal.targetAmount) * 100;

    const handleWithdrawFunds = () => {
        if (goal.currentAmount === 0) {
            showErrorSwal("This goal has no funds to withdraw.");
            return;
        }

        showAreYouSureSwal("All savings from this goal will be withdrawn.", async () => {
            const result = await withdrawFundsFromGoal(goal.id, token);
            if (result.success) {
                dispatch(setBudgetAction(budget + goal.currentAmount));
                dispatch(deleteSavingsByGoalAction(goal.name));
                dispatch(withdrawFundsFromGoalAction(goal.name));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
                return;
            }
        });
    };

    const handleDeleteGoal = async () => {
        const goalSavings = savings.filter(s => s.goal === goal.name);
        const totalDeletedAmount = goalSavings.reduce((acc, s) => acc + s.amount, 0);
        const updatedBudget = budget + totalDeletedAmount;
        
        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this goal would cause the budget to exceed the maximum allowed.");
            return;
        }

        showAreYouSureSwal("All savings associated with this goal will be deleted.", async () => {
            const result = await deleteGoal(goal.id, token);
            if (result.success) {
                onExpandToggle(goal.id);
                dispatch(deleteGoalAction(goal.id));
                dispatch(deleteSavingsByGoalAction(goal.name));
                dispatch(setBudgetAction(updatedBudget));
                dispatch(setSelectedGoalIdAction(null));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const getProgressIcon = (progress) => {
        if (progress < 25) return <FaRegSadTear color="#ff6b6b" size={24} />;
        if (progress < 50) return <MdSentimentDissatisfied color="#f8c291" size={26} />;
        if (progress < 75) return <MdSentimentSatisfied color="#ffe066" size={26} />;
        return <MdSentimentVerySatisfied color="#2ecc71" size={26} />;
    };

    return (
        <div className={`${styles["goal-card"]} ${isExpanded ? styles["expanded"] : ""}`}>
            <div className={styles["header"]}>
                <span className={styles["icon"]}>
                    {getProgressIcon(goalProgress)}
                </span>
                <h3>{goal.name}</h3>
            </div>
            <div className={styles["goal-progress-bar-container"]}>
                <div className={styles["amounts"]}>
                    <span>{goal.currentAmount}</span>
                    <span className={styles["separator"]}>/</span>
                    <span>{goal.targetAmount} {currency}</span>
                </div>
                {!isExpanded && (
                    <div className={styles["progress-bar"]}>
                        <div className={styles["progress"]} style={{ width: `${goalProgress}%` }}></div>
                    </div>
                )}
            </div>
            <div className={styles["div-buttons"]}>
                {!isExpanded && (
                    <button className={styles["btn-withdraw"]} type="button" onClick={handleWithdrawFunds}>
                        Withdraw Funds
                    </button>
                )}

                {isExpanded && (
                    <>
                        <button className={styles["btn-edit"]} type="button" onClick={() => onEditGoal(goal)}>
                            Edit
                        </button>
                        <button className={styles["btn-delete"]} type="button" onClick={handleDeleteGoal}>
                            Delete
                        </button>
                    </>
                )}

                <button className={styles["btn-toggle"]} type="button" onClick={() => onExpandToggle(goal.id)}>
                    {isExpanded ? "Back ▲" : "Expand ▼"}
                </button>
            </div>
        </div>
    );
};

export default GoalCard;
