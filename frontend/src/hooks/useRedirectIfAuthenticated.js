import { useEffect } from "react";
import useNavigation from "./useNavigation";

const useRedirectIfAuthenticated = () => {
    const { goToDashboard } = useNavigation();
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        if (token) {
            goToDashboard();
        }
    }, []);
};

export default useRedirectIfAuthenticated;
