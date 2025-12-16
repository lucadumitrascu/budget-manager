import useError from "../../../hooks/useError";
import { validateNumericField } from "../../../utils/validation";
import AuthForm from "../../../components/AuthForm";
import Input from "../../../components/Input";
import ProgressBar from "./ProgressBar";

const SalaryForm = ({
    salary,
    setSalary,
    salaryDay,
    setSalaryDay,
    step,
    setNextStep
}) => {
    const [error, setError] = useError();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateNumericField(salary, "Salary");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setError("");
        setNextStep();
    };

    const handleNoSalary = () => {
        setSalary(0);
        setSalaryDay(0);
        setNextStep();
    }

    return (
        <AuthForm
            title="Complete your account setup"
            primaryButtonText="Submit"
            secondaryButtonText="I don't have a salary"
            onSubmit={handleSubmit}
            onSecondaryButtonClick={handleNoSalary}
            error={error}
        >
            <ProgressBar step={step} />
            <Input label="Salary" id="salary" type="number" step="0.01" min="0.01"
                placeholder="Enter your salary" value={salary} onChange={(e) => setSalary(Number(e.target.value))}
            />
            <Input label="Salary Day" id="salaryDay" type="number" min="1" max="31"
                placeholder="Enter day (1-31)" value={salaryDay} onChange={(e) => setSalaryDay(Number(e.target.value))}
            />
        </AuthForm>
    );
};

export default SalaryForm;
