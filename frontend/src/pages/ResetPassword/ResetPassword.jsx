import { useState } from "react";
import { useLocation } from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import useError from "../../hooks/useError";
import { resetPassword } from "../../services/authService";
import { showSuccessSwal } from "../../utils/swal";
import { validatePasswordLength, validatePasswordMatch } from "../../utils/validation";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Form from "../../components/Form";
import Input from "../../components/Input";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useError();
    const { goToLogin } = useNavigation();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validatePasswordMatch(password, confirmPassword) ||
            validatePasswordLength(password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setIsLoading(true);
        const result = await resetPassword(password, token);
        setIsLoading(false);
        if (result.success) {
            showSuccessSwal(result.message, goToLogin);
        } else {
            setError(result.message)
        }
    };

    return (
        <AuthLayout>
            <Form
                title="Reset Password"
                onSubmit={handleSubmit}
                primaryButton={{ text: "Submit", isLoading: isLoading }}
                error={error}
            >
                <input type="email" name="username" autoComplete="username" style={{ display: "none" }} />
                <Input
                    label="Password" id="password" autoComplete="new-password" type="password"
                    maxLength="60" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input
                    label="Confirm Password" id="confirm-password" autoComplete="new-password" type="password"
                    maxLength="60" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form>
        </AuthLayout>
    );
}

export default ResetPassword;