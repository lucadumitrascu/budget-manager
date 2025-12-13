import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import { resetPassword } from "../../services/authService";
import { showSuccessSwal } from "../../utils/swal";
import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/AuthForm";
import Input from "../../components/Input";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);
    const [error, setError] = useError();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords must be the same.");
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
        } else {
            if (!submitClicked) {
                setSubmitClicked(true);
                const result = await resetPassword(password, token);
                if (result.success) {
                    showSuccessSwal(result.message, () => navigate("/authentication/login"));
                } else {
                    setError(result.message)
                }
                setSubmitClicked(false);
            }
        }
    };

    return (
        <AuthLayout>
            <AuthForm
                title="Reset Password"
                primaryButtonText="Submit"
                onSubmit={handleSubmit}
                error={error}
            >
                <Input
                    label="Password" id="password" autoComplete="new-password" type="password"
                    maxLength="60" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input
                    label="Confirm Password" id="confirm-password" autoComplete="new-password" type="password"
                    maxLength="60" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </AuthForm>
        </AuthLayout>
    );
}

export default ResetPassword;