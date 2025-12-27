import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { updateExpense } from "../../../services/expenseService";
import { updateExpenseAction } from "../../../redux/slices/expenseSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showInfoToast, showSuccessToast } from "../../../utils/toast";
import { hasChanges, isWithinNumericLimits, validateNumericField } from "../../../utils/validation";
import ModalForm from "../../../components/ModalForm";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

const EditExpenseModal = ({
    isOpen,
    onClose,
    budget,
    expense = null,
    categories = [],
    token,
}) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        if (expense) {
            setAmount(expense.amount || "");
            setCategory(expense.category || "");
            setDescription(expense.description || "");
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedExpense = {
            id: expense.id,
            amount: amount,
            category,
            createdAt: expense.createdAt,
            description: description.trim() || null,
        };

        if (!hasChanges(expense, updatedExpense)) {
            showInfoToast("Expense is already up-to-date");
            onClose();
            return;
        }

        const errorMessage = validateNumericField(amount, "Amount");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        const updatedBudget = budget + expense.amount - amount;

        if (!isWithinNumericLimits(updatedBudget)) {
            setError("Amount exceeds the allowed budget limit.");
            return;
        }

        if (updatedBudget < 0) {
            setError("Insufficient funds.");
            return;
        }

        const result = await updateExpense(updatedExpense, token);
        if (result.success) {
            dispatch(updateExpenseAction(updatedExpense));
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
            title="Edit Expense"
            onSubmit={handleSubmit}
            primaryButton={{ text: "Update" }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input
                label="Amount" id="amount" type="number" step="0.01" min="0.01"
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Select
                label="Category" id="category"
                options={categories.map(c => ({ value: c.name, label: c.name }))}
                value={category} onChange={(e) => setCategory(e.target.value)}
            />
            <Input
                label="Description" id="description" type="text" maxLength={100}
                value={description} onChange={(e) => setDescription(e.target.value)}
                required={false}
            />
        </ModalForm>
    );
};

export default EditExpenseModal;
