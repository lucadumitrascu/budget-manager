import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { addGoal, updateGoal } from "../../../services/goalService";
import { addGoalAction, updateGoalAction } from "../../../redux/slices/goalsSlice";
import { updateGoalInSavingsAction } from "../../../redux/slices/savingsSlice";
import { showInfoToast, showSuccessToast } from "../../../utils/toast";
import { validateUniqueTextField, validateNumericField, hasChanges } from "../../../utils/validation";
import ModalForm from "../../../components/ModalForm";
import Input from "../../../components/Input";

const GoalModal = ({
    isOpen,
    onClose,
    title,
    primaryButtonText,
    goal = null,
    goals = [],
    token
}) => {
    const dispatch = useDispatch();
    const [goalName, setGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        setGoalName(goal?.name || "");
        setTargetAmount(goal?.targetAmount || "");
    }, [goal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedGoal = {
            id: goal?.id,
            name: goalName.trim(),
            targetAmount,
            currentAmount: goal?.currentAmount,
            createdAt: goal?.createdAt
        };

        let errorMessage = "";
        if (goalName.trim() !== goal?.name) {
            errorMessage = validateUniqueTextField(goalName, goals, "Goal");
        }
        if (!errorMessage) {
            errorMessage = validateNumericField(targetAmount, "Target Amount");
        }

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        let result;
        if (goal?.id) {
            if (!hasChanges(goal, updatedGoal)) {
                showInfoToast("Goal is already up-to-date");
                onClose();
                return;
            }

            result = await updateGoal(updatedGoal, token);
            if (result.success) {
                dispatch(updateGoalAction(updatedGoal));
                dispatch(updateGoalInSavingsAction({
                    oldGoal: goal.name,
                    newGoal: updatedGoal.name
                }));
            }
        } else {
            const newGoal = {
                name: goalName.trim(),
                targetAmount
            };
            result = await addGoal(newGoal, token);
            if (result.success) {
                dispatch(addGoalAction(result.data));
            }
        }
        if (result.success) {
            showSuccessToast(result.message);
            setGoalName("");
            setTargetAmount("");
            setError("");
            onClose();
        } else {
            setError(result.message);
        }
    };

    return (
        <ModalForm
            title={title}
            onSubmit={handleSubmit}
            primaryButton={{ text: primaryButtonText }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input label="Goal" id="goal" type="text" placeholder="Goal Name..."
                value={goalName} onChange={(e) => setGoalName(e.target.value)}
                maxLength={50}
            />
            <Input label="Target Amount" id="target-amount" type="number" step={0.01} min={0.01}
                value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))}
            />
        </ModalForm>
    );
};

export default GoalModal;
