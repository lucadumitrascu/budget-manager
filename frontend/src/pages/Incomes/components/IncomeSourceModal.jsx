import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { addIncomeSource, updateIncomeSource } from "../../../services/incomeSourceService";
import { addIncomeSourceAction, updateIncomeSourceAction } from "../../../redux/slices/incomeSourcesSlice";
import { updateIncomeSourceInIncomesAction } from "../../../redux/slices/incomesSlice";
import { showInfoToast, showSuccessToast } from "../../../utils/toast";
import { validateUniqueTextField } from "../../../utils/validation";
import ModalForm from "../../../components/ModalForm";
import Input from "../../../components/Input";

const IncomeSourceModal = ({
    isOpen,
    onClose,
    title,
    primaryButtonText,
    incomeSource,
    incomeSources,
    token
}) => {
    const dispatch = useDispatch();
    const [incomeSourceName, setIncomeSourceName] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        setIncomeSourceName(incomeSource?.name || "");
    }, [incomeSource]);

    const hasChanges = incomeSource?.name !== incomeSourceName;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasChanges) {
            showInfoToast("Income source is already up-to-date");
            onClose();
            return;
        }

        const errorMessage = validateUniqueTextField(incomeSourceName, incomeSources, "Income source");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        let result;
        if (incomeSource?.id) {
            const updatedIncomeSource = {
                id: incomeSource.id,
                name: incomeSourceName.trim(),
                createdAt: incomeSource.createdAt
            };

            result = await updateIncomeSource(updatedIncomeSource, token);
            if (result.success) {
                dispatch(updateIncomeSourceAction(updatedIncomeSource));
                dispatch(updateIncomeSourceInIncomesAction({
                    oldIncomeSource: incomeSource.name,
                    newIncomeSource: updatedIncomeSource.name
                }));
            }
        } else {
            result = await addIncomeSource(incomeSourceName.trim(), token);
            if (result.success) {
                dispatch(addIncomeSourceAction(result.data));
            }
        }
        if (result.success) {
            showSuccessToast(result.message);
            setIncomeSourceName("");
            setError("");
            onClose();
        } else {
            setError(result.message);
        }
    };

    return (
        <ModalForm
            title={title}
            onSubmit={handleSubmit}
            primaryButton={{ text: primaryButtonText }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input
                label="Income Source" id="income-source" type="text" placeholder="Income Source Name..."
                value={incomeSourceName} onChange={(e) => setIncomeSourceName(e.target.value)}
                maxLength={50}
            />
        </ModalForm>
    );
};

export default IncomeSourceModal;
