import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/useError";
import { sendEmail } from "../../services/authService";
import { showSuccessSwal } from "../../utils/swal";
import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/AuthForm";
import Input from "../../components/Input";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);
    const [error, setError] = useError();
    const navigate = useNavigate();

    const handleGoBackClick = () => {
        navigate("/authentication/login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!submitClicked) {
            setSubmitClicked(true);
            const result = await sendEmail(email);
            if (result.success) {
                showSuccessSwal(result.message, () => navigate("/authentication/login"));
            } else {
                setError(result.message)
            }
            setSubmitClicked(false);
        }
    };

    return (
        <AuthLayout>
            <AuthForm
                title="Forgot Password"
                primaryButtonText="Submit"
                secondaryButtonText="Go back"
                onSubmit={handleSubmit}
                onSecondaryButtonClick={handleGoBackClick}
                error={error}
            >
                <Input
                    label="Email" id="email" autoComplete="email" type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </AuthForm>
        </AuthLayout>
    );
}

export default ForgotPassword;