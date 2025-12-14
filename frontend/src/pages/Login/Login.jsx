import { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useError from "../../hooks/useError";
import { authenticateUser } from "../../services/authService";
import { validateEmail } from "../../utils/validation";
import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/AuthForm";
import Input from "../../components/Input";
import PasswordInput from "./components/PasswordInput";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useError();
    const { goToDashboard, goToRegister } = useNavigation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateEmail(email);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setIsLoading(true);
        const result = await authenticateUser(email, password);
        setIsLoading(false);
        if (result.success) {
            goToDashboard();
        } else {
            setError(result.message);
        }
    };

    return (
        <AuthLayout>
            <AuthForm
                primaryButtonText="Login"
                secondaryButtonText="Register"
                onSubmit={handleSubmit}
                onSecondaryButtonClick={goToRegister}
                isLoading={isLoading}
                error={error}
            >
                <Input
                    label={"Email"} id="email" autoComplete="email" type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </AuthForm>
        </AuthLayout>
    );
}

export default Login;