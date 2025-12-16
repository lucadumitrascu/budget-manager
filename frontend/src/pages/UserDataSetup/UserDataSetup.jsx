import { useState, useEffect } from "react";
import useNavigation from "../../hooks/useNavigation";
import useError from "../../hooks/useError";
import { saveFinancialInfo } from "../../services/financialInfoService";
import { showSuccessSwal } from "../../utils/swal";
import AuthLayout from "../../layouts/AuthLayout";
import UsernameForm from "./components/UsernameForm";
import SalaryForm from "./components/SalaryForm";
import BudgetForm from "./components/BudgetForm";

function UserDataSetup() {
    const [budget, setBudget] = useState("");
    const [currency, setCurrency] = useState("RON");
    const [salary, setSalary] = useState("");
    const [salaryDay, setSalaryDay] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useError();
    const { goToRegister, goToDashboard } = useNavigation();

    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        if (!token) goToRegister();
    }, [token]);

    const handleSubmitFinancialInfo = async () => {
        const result = await saveFinancialInfo(salary, salaryDay, budget, currency, token);
        if (result.success) {
            showSuccessSwal(result.message, goToDashboard);
        } else {
            setError(result.message);
        }
    };

    const setNextStep = () => setStep(prev => prev + 1);

    return (
        <AuthLayout>
            {step === 1 &&
                <UsernameForm
                    step={step}
                    setNextStep={setNextStep}
                    token={token} />
            }

            {step === 2 &&
                <SalaryForm
                    salary={salary}
                    setSalary={setSalary}
                    salaryDay={salaryDay}
                    setSalaryDay={setSalaryDay}
                    step={step}
                    setNextStep={setNextStep} />
            }

            {step === 3 &&
                <BudgetForm
                    budget={budget}
                    setBudget={setBudget}
                    currency={currency}
                    setCurrency={setCurrency}
                    step={step}
                    error={error}
                    setError={setError}
                    handleSubmitFinancialInfo={handleSubmitFinancialInfo} />
            }
        </AuthLayout>
    );
}

export default UserDataSetup;