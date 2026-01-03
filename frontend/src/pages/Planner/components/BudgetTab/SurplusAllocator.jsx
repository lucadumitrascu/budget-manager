import styles from "./SurplusAllocator.module.css";

const SurplusAllocator = ({
    remaining,
    currency,
    localSelectedGoalId,
    setLocalSelectedGoalId,
    goals
}) => {
    const goalOptions = goals.length === 0
        ? [{ value: "", label: "No goals available" }]
        : goals.map(g => ({ value: g.id, label: g.name }));

    return (
        <div className={styles["surplus-allocator"]}>
            <p>
                Remaining (Saved): {remaining} {currency} – Allocate To:
                <select
                    id="remaining-goal"
                    disabled={goals.length === 0}
                    value={localSelectedGoalId}
                    onChange={(e) => setLocalSelectedGoalId(Number(e.target.value))}
                >
                    {goalOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </p>
        </div>
    );
};

export default SurplusAllocator;
