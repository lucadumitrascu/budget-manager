import { useEffect } from "react";
import useNavigation from "./useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setUsernameAction } from "../redux/slices/userSlice";
import { setFinancialInfoAction } from "../redux/slices/financialInfoSlice";
import { getUserData } from "../services/userService";

const useLoadAuthenticatedUser = () => {
    const { goToLogin } = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const financialInfo = useSelector((state) => state.financialInfo);
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        if (!token) {
            goToLogin();
            return;
        }

        if (user.username !== undefined) {
            return;
        }

        const loadUserData = async () => {
            const result = await getUserData(token);
            if (result.success) {
                dispatch(setUsernameAction(result.data.username));
                dispatch(setFinancialInfoAction({
                    budget: result.data.financialInfo.budget,
                    currency: result.data.financialInfo.currency,
                    salary: result.data.financialInfo.salary,
                    salaryDay: result.data.financialInfo.salaryDay,
                }));
            } else {
                goToLogin();
            }
        };

        loadUserData();
    }, [user.username, financialInfo, token]);

    return { token, financialInfo };
};

export default useLoadAuthenticatedUser;
