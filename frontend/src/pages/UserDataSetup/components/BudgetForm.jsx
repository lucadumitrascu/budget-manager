import { useState } from "react";
import { validateNumericField } from "../../../utils/validation";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import ProgressBar from "../../../components/ProgressBar";

const BudgetForm = ({
    budget,
    setBudget,
    currency,
    setCurrency,
    error,
    setError,
    onSubmitFinancialInfo,
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
        await onSubmitFinancialInfo();
        setIsLoading(false);
    }

    return (
        <Form
            title="Complete your account setup"
            onSubmit={handleSubmit}
            primaryButton={{ text: "Finish", isLoading: isLoading }}
            error={error}
        >
            <ProgressBar step={3} />
            <Input label="Budget" id="budget" type="number" step={0.01} min={0}
                value={budget} onChange={(e) => setBudget(Number(e.target.value))}
            />
            <Select label="Currency" id="currency" value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
        </Form>
    );
};

export default BudgetForm;
