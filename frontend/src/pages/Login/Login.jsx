import { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useError from "../../hooks/useError";
import { authenticateUser } from "../../services/authService";
import { validateEmail } from "../../utils/validation";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Form from "../../components/Form";
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
            <Form
                title="Login"
                onSubmit={handleSubmit}
                primaryButton={{ text: "Login", isLoading: isLoading }}
                secondaryButton={{ text: "Register", onClick: goToRegister }}
                error={error}
                containsGoogleLoginButton={true}
            >
                <Input
                    label={"Email"} id="email" autoComplete="email" type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form>
        </AuthLayout>
    );
}

export default Login;