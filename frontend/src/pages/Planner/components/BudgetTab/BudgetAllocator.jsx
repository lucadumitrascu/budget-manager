import ProgressBar from "../../../../components/ProgressBar";
import { MAX_NUMBER_LIMIT } from "../../../../utils/constants";
import styles from "./BudgetAllocator.module.css";

const BudgetAllocator = ({
    currency,
    budget,
    totalAllocated,
    localMonthlyBudget,
    setLocalMonthlyBudget,
}) => {
    const handleBudgetChange = (e) => {
        let value = e.target.value;
        if (parseFloat(value) > MAX_NUMBER_LIMIT) {
            value = MAX_NUMBER_LIMIT;
        }
        setLocalMonthlyBudget(Number(value));
    }
    const handleAllocateAll = () => {
        setLocalMonthlyBudget(budget);
    };

    return (
        <div className={styles["budget-allocator"]}>
            <div className={styles["allocation-container"]}>
                <div></div>
                <p>Total Allocated: {totalAllocated} /
                    <input id="total-allocated" type="number" min={0}
                        value={localMonthlyBudget} onChange={handleBudgetChange}
                    />
                    {currency}
                </p>
                <button type="button" onClick={handleAllocateAll}>
                    Allocate All
                </button>
            </div>
            <ProgressBar
                step={totalAllocated}
                totalSteps={localMonthlyBudget}
                isAuthPage={false}
            />
        </div>
    );
};

export default BudgetAllocator;
