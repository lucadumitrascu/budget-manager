import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../../hooks/useError";
import { addFixedTransaction, updateFixedTransaction } from "../../../../services/fixedTransactionService";
import { addFixedTransactionAction, updateFixedTransactionAction } from "../../../../redux/slices/fixedTransactionsSlice";
import { showSuccessToast, showInfoToast } from "../../../../utils/toast";
import { validateNumericField, hasChanges } from "../../../../utils/validation";
import ModalForm from "../../../../components/ModalForm";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";

const FixedTransactionModal = ({
    isOpen,
    onClose,
    title,
    primaryButtonText,
    fixedTransaction = null,
    categories = [],
    incomeSources = [],
    token
}) => {
    const dispatch = useDispatch();
    const [transactionTitle, setTransactionTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("EXPENSE");
    const [destinationId, setDestinationId] = useState("");
    const [frequency, setFrequency] = useState("MONTHLY");
    const [executionDay, setExecutionDay] = useState(1);
    const [error, setError] = useError();

    useEffect(() => {
        setTransactionTitle(fixedTransaction?.title || "");
        setAmount(fixedTransaction?.amount || "");
        setType(fixedTransaction?.type || "EXPENSE");
        setFrequency(fixedTransaction?.frequency || "MONTHLY");
        setExecutionDay(fixedTransaction?.executionDay || 1);
        setDestinationId(fixedTransaction?.destinationId || "");
    }, [fixedTransaction]);

    useEffect(() => {
        if (type === "EXPENSE" && categories.length > 0) {
            setDestinationId(categories[0].id);
        } else if (type === "INCOME" && incomeSources.length > 0) {
            setDestinationId(incomeSources[0].id);
        } else {
            setDestinationId("");
        }
    }, [type, categories, incomeSources]);

    const getExecutionDay = () => frequency === "DAILY" ? 0 : executionDay;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateNumericField(amount, "Amount");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        let result;
        if (fixedTransaction?.id) {
            const updatedTransaction = {
                id: fixedTransaction.id,
                title: transactionTitle.trim(),
                type,
                amount,
                destinationId,
                frequency,
                executionDay: getExecutionDay()
            };

            if (!hasChanges(fixedTransaction, updatedTransaction)) {
                showInfoToast("Fixed transaction is already up-to-date");
                onClose();
                return;
            }

            result = await updateFixedTransaction(updatedTransaction, token);
            if (result.success) {
                dispatch(updateFixedTransactionAction(updatedTransaction));
            }
        } else {
            const newTransaction = {
                title: transactionTitle.trim(),
                type,
                amount,
                destinationId,
                frequency,
                executionDay: getExecutionDay()
            };
            result = await addFixedTransaction(newTransaction, token);
            if (result.success) {
                dispatch(addFixedTransactionAction(result.data));
            }
        }

        if (result.success) {
            showSuccessToast(result.message);
            setTransactionTitle("");
            setAmount("");
            setType("EXPENSE");
            setFrequency("MONTHLY");
            setExecutionDay(1);
            setError("");
            onClose();
        } else {
            setError(result.message);
        }
    };

    const categoryOptions = categories.length === 0
        ? [{ value: "", label: "No categories available" }]
        : categories.map(c => ({ value: c.id, label: c.name }));

    const incomeSourceOptions = incomeSources.length === 0
        ? [{ value: "", label: "No income sources available" }]
        : incomeSources.map(i => ({ value: i.id, label: i.name }));

    return (
        <ModalForm
            title={title}
            onSubmit={handleSubmit}
            primaryButton={{ text: primaryButtonText }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input label="Title" id="title" type="text" placeholder="Transaction Title..." maxLength={30}
                value={transactionTitle} onChange={(e) => setTransactionTitle(e.target.value)}
            />

            <Input label="Amount" id="amount" type="number" step={0.01} min={0.01}
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            />

            <Select label="Type" id="type" value={type} onChange={(e) => setType(e.target.value)}
                options={[
                    { value: "EXPENSE", label: "Expense" },
                    { value: "INCOME", label: "Income" }
                ]}
            />

            {type === "EXPENSE" && (
                <Select label="Category" id="category" options={categoryOptions}
                    value={destinationId} onChange={(e) => setDestinationId(Number(e.target.value))}
                />
            )}

            {type === "INCOME" && (
                <Select label="Income Source" id="income-source" options={incomeSourceOptions}
                    value={destinationId} onChange={(e) => setDestinationId(Number(e.target.value))}
                />
            )}

            <Select
                label="Frequency" id="frequency" value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                options={[
                    { value: "MONTHLY", label: "Monthly" },
                    { value: "WEEKLY", label: "Weekly" },
                    { value: "DAILY", label: "Daily" }
                ]}
            />
            {frequency !== "DAILY" && (
                <Input
                    label={frequency === "MONTHLY" ? "Day of month (1-31)" : "Day of week (1-7)"}
                    id="execution-day" type="number" min={1} max={frequency === "MONTHLY" ? 31 : 7}
                    value={executionDay} onChange={(e) => setExecutionDay(Number(e.target.value))}
                />
            )}
        </ModalForm>
    );
};

export default FixedTransactionModal;
