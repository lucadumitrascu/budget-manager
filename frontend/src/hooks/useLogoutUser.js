import { useDispatch } from "react-redux";
import useNavigation from "./useNavigation";
import { logoutUserAction } from "../redux/rootActions";

const useLogoutUser = () => {
    const { goToLogin } = useNavigation();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        localStorage.clear();
        dispatch(logoutUserAction());
        goToLogin();
    };

    return logoutUser;
};

export default useLogoutUser;
