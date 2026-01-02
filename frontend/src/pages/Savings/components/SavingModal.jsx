import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { addSaving, updateSaving } from "../../../services/savingService";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { addSavingAction, updateSavingAction } from "../../../redux/slices/savingsSlice";
import { adjustGoalCurrentAmountAction } from "../../../redux/slices/goalsSlice";
import { showInfoToast, showSuccessToast } from "../../../utils/toast";
import { hasChanges, validateNumericField } from "../../../utils/validation";
import ModalForm from "../../../components/ModalForm";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

const SavingModal = ({
    isOpen,
    onClose,
    title,
    primaryButtonText,
    budget,
    saving = null,
    goals = [],
    token
}) => {
    const dispatch = useDispatch();
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        setAmount(saving?.amount || "");
        setGoal(saving?.goal || (goals.length > 0 ? goals[0].name : ""));
    }, [saving, goals]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!goal) {
            setError("Goal is required.");
            return;
        }

        const errorMessage = validateNumericField(amount, "Amount");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        const oldAmount = saving?.amount || 0;
        const oldGoal = saving?.goal || "";
        let updatedBudget = budget;

        if (saving?.id) {
            updatedBudget = budget + oldAmount - amount;
        } else {
            updatedBudget = budget - amount;
        }

        if (updatedBudget < 0) {
            setError("Insufficient funds.");
            return;
        }

        let result;
        if (saving?.id) {
            const updatedSaving = {
                id: saving.id,
                goal,
                amount,
                createdAt: saving.createdAt
            };

            if (!hasChanges(saving, updatedSaving)) {
                showInfoToast("Saving is already up-to-date");
                onClose();
                return;
            }

            result = await updateSaving(updatedSaving, token);
            if (result.success) {
                dispatch(updateSavingAction(updatedSaving));
                if (oldGoal && oldGoal !== goal) {
                    dispatch(adjustGoalCurrentAmountAction({ goalName: oldGoal, amount: -oldAmount }));
                    dispatch(adjustGoalCurrentAmountAction({ goalName: goal, amount: amount }));
                } else if (oldGoal === goal && oldAmount !== amount) {
                    const difference = amount - oldAmount;
                    dispatch(adjustGoalCurrentAmountAction({ goalName: goal, amount: difference }));
                }
            }
        }
        else {
            const newSaving = {
                amount,
                goal,
            };
            result = await addSaving(newSaving, token);
            if (result.success) {
                dispatch(addSavingAction(result.data));
                dispatch(adjustGoalCurrentAmountAction({ goalName: goal, amount: amount }));
            }
        }
        if (result.success) {
            showSuccessToast(result.message);
            dispatch(setBudgetAction(updatedBudget));
            setAmount("");
            setError("");
            onClose();
        } else {
            setError(result.message);
        }
    };

    const goalOptions = goals.length === 0
        ? [{ value: "", label: "No goals available" }]
        : goals.map(g => ({ value: g.name, label: g.name }));

    return (
        <ModalForm
            title={title}
            onSubmit={handleSubmit}
            primaryButton={{ text: primaryButtonText }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input label="Amount" id="amount" type="number" step={0.01} min={0.01}
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Select label="Goal" id="goal" options={goalOptions}
                value={goal} onChange={(e) => setGoal(e.target.value)}
            />
        </ModalForm>
    );
};

export default SavingModal;
