import { useState } from "react";
import { validateNumericField } from "../../../utils/validation";
import AuthForm from "../../../components/AuthForm";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import ProgressBar from "./ProgressBar";

const BudgetForm = ({
    budget,
    setBudget,
    currency,
    setCurrency,
    error,
    setError,
    handleSubmitFinancialInfo,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateNumericField(budget, "Budget");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setIsLoading(true);
        await handleSubmitFinancialInfo();
        setIsLoading(false);
    }

    return (
        <AuthForm
            title="Complete your account setup"
            primaryButtonText="Finish"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
        >
            <ProgressBar step={3} />
            <Input label="Budget" id="budget" type="number" step="0.01" min="0"
                placeholder="Enter your current budget" value={budget} onChange={(e) => setBudget(Number(e.target.value))}
            />
            <Select label="Currency" id="currency" value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
        </AuthForm>
    );
};

export default BudgetForm;
