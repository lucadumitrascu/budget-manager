import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    return {
        goToLogin: () => navigate("/authentication/login"),
        goToRegister: () => navigate("/authentication/register"),
        goToForgotPassword: () => navigate("/authentication/forgot-password"),
        goToDashboard: () => navigate("/dashboard"),
    };
};

export default useNavigation;
