import { useState } from "react";
import useError from "../../../hooks/useError";
import { saveUsername } from "../../../services/userService";
import { showSuccessSwal } from "../../../utils/swal";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import ProgressBar from "./ProgressBar";

const UsernameForm = ({
    step,
    setNextStep,
    token
}) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useError();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const result = await saveUsername(username, token);
        setIsLoading(false);
        if (result.success) {
            showSuccessSwal(result.message, () => {
                setError("");
                setNextStep();
            });
        } else {
            setError(result.message);
        }
    };

    return (
        <Form
            title="Complete your account setup"
            onSubmit={handleSubmit}
            primaryButton={{ text: "Next", isLoading: isLoading }}
            error={error}
        >
            <ProgressBar step={step} />
            <Input
                label="Username" id="username" autoComplete="username" type="text"
                maxLength="50" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form>
    );
}

export default UsernameForm;
