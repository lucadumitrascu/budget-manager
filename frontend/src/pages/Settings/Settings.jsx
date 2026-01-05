import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLoadAuthenticatedUser from "../../hooks/useLoadAuthenticatedUser";
import useLogoutUser from "../../hooks/useLogoutUser";
import { saveUsername } from "../../services/userService";
import { saveBudget, saveCurrency } from "../../services/financialInfoService";
import { deleteUser, resetUserData } from "../../services/userService";
import { setUsernameAction } from "../../redux/slices/userSlice";
import { setBudgetAction, setCurrencyAction } from "../../redux/slices/financialInfoSlice";
import { resetUserDataAction } from "../../redux/rootActions";
import { showErrorSwal, showAreYouSureSwal, showSuccessSwal } from "../../utils/swal";
import { showInfoToast, showSuccessToast } from "../../utils/toast";
import { validateNumericField } from "../../utils/validation";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SettingsItem from "./components/SettingsItem";
import styles from "./Settings.module.css";

function Settings() {
    const { token, financialInfo } = useLoadAuthenticatedUser();
    const username = useSelector((state) => state.user.username);
    const [localUsername, setLocalUsername] = useState(username || "");
    const [localBudget, setLocalBudget] = useState(financialInfo.budget || 0);
    const [localCurrency, setLocalCurrency] = useState(financialInfo.currency || "RON");
    const logoutUser = useLogoutUser();
    const dispatch = useDispatch();

    useEffect(() => {
        setLocalUsername(username || "");
        setLocalBudget(financialInfo.budget || 0);
        setLocalCurrency(financialInfo.currency || "RON");
    }, [username, financialInfo.budget, financialInfo.currency]);

    const usernameChanged = localUsername.trim() !== username;
    const budgetChanged = localBudget !== financialInfo.budget;
    const currencyChanged = localCurrency !== financialInfo.currency;

    const handleSaveUsername = async () => {
        const updatedUsername = localUsername.trim();
        if (!usernameChanged) {
            showInfoToast("Username is already up-to-date.");
            return;
        }
        if (updatedUsername === "") {
            showErrorSwal("Username cannot be empty.");
            setLocalUsername(username);
            return;
        }

        const result = await saveUsername(updatedUsername, token);
        if (result.success) {
            dispatch(setUsernameAction(updatedUsername));
            setLocalUsername(updatedUsername);
            showSuccessToast(result.message);
        } else {
            showErrorSwal(result.message);
            setLocalUsername(username);
        }
    };

    const handleSaveBudget = async () => {
        if (!budgetChanged) {
            showInfoToast("Budget is already up-to-date.");
            return;
        }
        const errorMessage = validateNumericField(localBudget, "Budget");
        if (errorMessage) {
            showErrorSwal(errorMessage);
            setLocalBudget(financialInfo.budget);
            return;
        }

        const result = await saveBudget(localBudget, token);
        if (result.success) {
            dispatch(setBudgetAction(localBudget));
            setLocalBudget(localBudget);
            showSuccessToast(result.message);
        } else {
            showErrorSwal(result.message);
            setLocalBudget(financialInfo.budget);
        }
    };

    const handleSaveCurrency = async () => {
        if (!currencyChanged) {
            showInfoToast("Currency is already up-to-date.");
            return;
        }

        const result = await saveCurrency(localCurrency, token);
        if (result.success) {
            dispatch(setCurrencyAction(localCurrency));
            setLocalCurrency(localCurrency);
            showSuccessToast(result.message);
        } else {
            showErrorSwal(result.message);
            setLocalCurrency(financialInfo.currency);
        }
    };

    const handleDeleteAccount = async () => {
        showAreYouSureSwal("This action will permanently delete the account and all associated data.", async () => {
            const result = await deleteUser(token);
            if (result.success) {
                await logoutUser();
                showSuccessSwal(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const handleResetUserData = async () => {
        showAreYouSureSwal("This action will reset all account data to the default values.", async () => {
            const result = await resetUserData(token);
            if (result.success) {
                dispatch(resetUserDataAction());
                setLocalBudget(0);
                showSuccessSwal(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    return (
        <MainLayout title="Settings" isCenteredVertically={true}>
            <div className={styles["settings"]}>
                <h2>User Information</h2>

                <SettingsItem
                    label="Username"
                    id="username"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    onSave={handleSaveUsername}
                />
                <SettingsItem
                    label="Budget"
                    id="budget"
                    value={localBudget}
                    onChange={(e) => setLocalBudget(Number(e.target.value))}
                    onSave={handleSaveBudget}
                />
                <SettingsItem
                    label="Currency"
                    id="currency"
                    value={localCurrency}
                    onChange={(e) => setLocalCurrency(e.target.value)}
                    onSave={handleSaveCurrency}
                />

                <button className={styles["btn-reset"]} onClick={handleResetUserData}>
                    Reset Account Data
                </button>

                <button className={styles["btn-delete"]} onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>
        </MainLayout>
    );
};

export default Settings;
