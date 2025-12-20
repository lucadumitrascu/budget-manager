import { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useError from "../../hooks/useError";
import { createAccount } from "../../services/authService";
import { validateEmail, validatePasswordLength, validatePasswordMatch } from "../../utils/validation";
import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/AuthForm";
import Input from "../../components/Input";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useError();
    const { goToUserDataSetup, goToLogin } = useNavigation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateEmail(email) ||
            validatePasswordMatch(password, confirmPassword) ||
            validatePasswordLength(password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setIsLoading(true);
        const result = await createAccount(email, password);
        setIsLoading(false);
        if (result.success) {
            goToUserDataSetup();
        } else {
            setError(result.message);
        }
    };

    return (
        <AuthLayout>
            <AuthForm
                primaryButtonText="Register"
                secondaryButtonText="Login"
                onSubmit={handleSubmit}
                onSecondaryButtonClick={goToLogin}
                isLoading={isLoading}
                error={error}
                containsGoogleLoginButton={true}
            >
                <Input
                    label={"Email"} id="email" autoComplete="email" type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input
                    label={"Password"} id="password" autoComplete="new-password" type="password"
                    maxLength="60" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input
                    label={"Confirm Password"} id="confirm-password" autoComplete="new-password" type="password"
                    maxLength="60" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </AuthForm>
        </AuthLayout>
    );
}

export default Register;