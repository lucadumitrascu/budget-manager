import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { addExpense } from "../../../services/expenseService";
import { addExpenseAction } from "../../../redux/slices/expenseSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showSuccessToast } from "../../../utils/toast";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

const ExpenseForm = ({
    budget,
    currency,
    categories,
    toggleView,
    toggleViewButtonText,
    addCategory,
    token,
}) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        setCategory(categories.length > 0 ? categories[0].name : "");
    }, [categories]);

    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!category) {
            setError("Category is required.");
            return;
        }

        const updatedBudget = budget - amount;
        if (updatedBudget < 0) {
            setError("Insufficient funds.");
            return;
        }

        const newExpense = {
            amount,
            category,
            description: description.trim() || null,
        };

        const result = await addExpense(newExpense, token);
        if (result.success) {
            dispatch(addExpenseAction(result.data));
            dispatch(setBudgetAction(updatedBudget));
            setAmount("");
            setDescription("");
            setError("");
            showSuccessToast(result.message);
        } else {
            setError(result.message);
        }
    };

    const categoryOptions = categories.length === 0
        ? [{ value: "", label: "No categories available" }]
        : categories.map(c => ({ value: c.name, label: c.name }));

    return (
        <Form
            title={`Budget: ${budget.toFixed(2)} ${currency}`}
            isAuthForm={false}
            onSubmit={handleAddExpense}
            primaryButton={{ text: "Submit", isLoading: false }}
            tertiaryButton={{ text: "Add Category", onClick: toggleViewButtonText === "Manage Expenses" ? addCategory : null }}
            secondaryButton={{ text: toggleViewButtonText, onClick: toggleView }}
            error={error}
            containsGoogleLoginButton={false}
        >
            <Input
                label="Amount" id="amount" type="number" step="0.01" min="0.01"
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            />

            <Select
                label="Category" id="category" options={categoryOptions}
                value={category} onChange={(e) => setCategory(e.target.value)}
            />

            <Input
                label="Description" id="description" type="text" maxLength={100}
                value={description} onChange={(e) => setDescription(e.target.value)}
                required={false}
            />
        </Form>
    );
};

export default ExpenseForm;
