import useNavigation from "../hooks/useNavigation";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../services/authService";
import { showErrorSwal } from "../utils/swal";
import { FcGoogle } from "react-icons/fc";
import styles from "./Form.module.css";

const GoogleLoginButton = () => {

    const { goToDashboard, goToUserDataSetup } = useNavigation();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const result = await googleLogin(code);
            if (result.success) {
                if (result.status === 201) {
                    goToUserDataSetup();
                } else {
                    goToDashboard();
                }
            } else {
                showErrorSwal(result.message);
            }
        },
        onError: () => {
            showErrorSwal("Google login failed.");
        },
        flow: "auth-code",
    });

    return (
        <button type="button" className={styles["google-login-button"]} onClick={handleGoogleLogin} >
            <FcGoogle className={styles["google-icon"]} />
            Continue with Google
        </button>
    );
};

export default GoogleLoginButton;
