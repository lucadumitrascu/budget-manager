import { useState } from "react";
import GoalCard from "./GoalCard";
import SavingTable from "./SavingTable";
import styles from "./GoalsSection.module.css";

const GoalsSection = ({
    budget,
    currency,
    goals,
    savings,
    onEditGoal,
    onEditSaving,
    token
}) => {
    const [expandedCardId, setExpandedCardId] = useState(null);
    const handleToggleExpand = (id) => setExpandedCardId(prev => (prev === id ? null : id));
    const expandedGoal = goals?.find((goal) => goal.id === expandedCardId);
    const expandedGoalSavings = !expandedGoal ? [] : savings.filter((s) => s.goal === expandedGoal.name);

    return (
        <>
            <div className={styles["goals-section"]}>
                {goals.map((goal) => {
                    if (expandedCardId && expandedCardId !== goal.id) return null;

                    return (
                        <GoalCard
                            key={goal.id}
                            budget={budget}
                            currency={currency}
                            goal={goal}
                            savings={savings}
                            isExpanded={expandedCardId === goal.id}
                            onExpandToggle={handleToggleExpand}
                            onEditGoal={onEditGoal}
                            token={token}
                        />
                    );
                })}
            </div>

            {expandedGoal && (
                <SavingTable
                    budget={budget}
                    savings={expandedGoalSavings}
                    goals={goals}
                    onEditSaving={onEditSaving}
                    token={token}
                />
            )}
        </>
    );
};

export default GoalsSection;
