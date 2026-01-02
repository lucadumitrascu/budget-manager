import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { updateIncome } from "../../../services/incomeService";
import { updateIncomeAction } from "../../../redux/slices/incomesSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showInfoToast, showSuccessToast } from "../../../utils/toast";
import { hasChanges, isWithinNumericLimits, validateNumericField } from "../../../utils/validation";
import ModalForm from "../../../components/ModalForm";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

const EditIncomeModal = ({
    isOpen,
    onClose,
    budget,
    income = null,
    incomeSources = [],
    token,
}) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [incomeSource, setIncomeSource] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        if (income) {
            setAmount(income.amount || "");
            setIncomeSource(income.incomeSource || "");
        }
    }, [income]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedIncome = {
            id: income.id,
            amount,
            incomeSource,
            createdAt: income.createdAt,
        };

        if (!hasChanges(income, updatedIncome)) {
            showInfoToast("Income is already up-to-date");
            onClose();
            return;
        }

        const errorMessage = validateNumericField(amount, "Amount");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        const updatedBudget = budget - income.amount + amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            setError("Amount exceeds the allowed budget limit.");
            return;
        }

        const result = await updateIncome(updatedIncome, token);
        if (result.success) {
            dispatch(updateIncomeAction(updatedIncome));
            dispatch(setBudgetAction(updatedBudget));
            showSuccessToast(result.message);
            setError("");
            onClose();
        } else {
            setError(result.message);
        }
    };

    return (
        <ModalForm
            title="Edit Income"
            onSubmit={handleSubmit}
            primaryButton={{ text: "Update" }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input
                label="Amount" id="amount" type="number" step={0.01} min={0.01}
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Select
                label="Income Source" id="income-source"
                options={incomeSources.map(i => ({ value: i.name, label: i.name }))}
                value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)}
            />
        </ModalForm>
    );
};

export default EditIncomeModal;
