import { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useError from "../../hooks/useError";
import { sendEmail } from "../../services/authService";
import { showErrorSwal, showSuccessSwal } from "../../utils/swal";
import { validateEmail } from "../../utils/validation";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Form from "../../components/Form";
import Input from "../../components/Input";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useError();

    const { goToLogin } = useNavigation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateEmail(email);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setIsLoading(true);
        const result = await sendEmail(email);
        setIsLoading(false);
        if (result.success) {
            showSuccessSwal(result.message, goToLogin);
        } else {
            showErrorSwal(result.message)
        }
    };

    return (
        <AuthLayout>
            <Form
                title="Forgot Password"
                onSubmit={handleSubmit}
                primaryButton={{ text: "Submit", isLoading: isLoading }}
                secondaryButton={{ text: "Go back", onClick: goToLogin }}
                error={error}
            >
                <Input
                    label="Email" id="email" autoComplete="email" type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form>
        </AuthLayout>
    );
}

export default ForgotPassword;