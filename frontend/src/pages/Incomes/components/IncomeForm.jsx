import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { addIncome } from "../../../services/incomeService";
import { addIncomeAction } from "../../../redux/slices/incomesSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showSuccessToast } from "../../../utils/toast";
import { isWithinNumericLimits } from "../../../utils/validation";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

const IncomeForm = ({
    budget,
    currency,
    incomeSources,
    toggleView,
    toggleViewButtonText,
    onAddIncomeSource,
    token,
}) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [incomeSource, setIncomeSource] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        setIncomeSource(incomeSources.length > 0 ? incomeSources[0].name : "");
    }, [incomeSources]);

    const handleAddIncome = async (e) => {
        e.preventDefault();

        if (!incomeSource) {
            setError("Income source is required.");
            return;
        }

        const updatedBudget = budget + amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            setError("Amount exceeds the allowed budget limit.");
            return;
        }

        const newIncome = {
            amount,
            incomeSource,
        };

        const result = await addIncome(newIncome, token);
        if (result.success) {
            dispatch(addIncomeAction(result.data));
            dispatch(setBudgetAction(updatedBudget));
            setAmount("");
            setError("");
            showSuccessToast(result.message);
        } else {
            setError(result.message);
        }
    };

    const incomeSourceOptions = incomeSources.length === 0
        ? [{ value: "", label: "No income sources available" }]
        : incomeSources.map(i => ({ value: i.name, label: i.name }));

    return (
        <Form
            title={`Budget: ${budget.toFixed(2)} ${currency}`}
            isAuthForm={false}
            onSubmit={handleAddIncome}
            primaryButton={{ text: "Submit", isLoading: false }}
            tertiaryButton={{ text: "Add Income Source", onClick: toggleViewButtonText === "Manage Incomes" ? onAddIncomeSource : null }}
            secondaryButton={{ text: toggleViewButtonText, onClick: toggleView }}
            error={error}
            containsGoogleLoginButton={false}
        >
            <Input
                label="Amount" id="amount" type="number" step={0.01} min={0.01}
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            />

            <Select
                label="Income Source" id="income-source" options={incomeSourceOptions}
                value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)}
            />
        </Form>
    );
};

export default IncomeForm;
