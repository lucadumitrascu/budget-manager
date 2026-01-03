import { useDispatch } from "react-redux";
import { deleteFixedTransaction } from "../../../../services/fixedTransactionService";
import { deleteFixedTransactionAction } from "../../../../redux/slices/fixedTransactionsSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../../utils/swal";
import { showSuccessToast } from "../../../../utils/toast";
import styles from "./FixedTransactionCard.module.css";

const FixedTransactionCard = ({
    fixedTransaction,
    currency,
    categories,
    incomeSources,
    onEditFixedTransaction,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteFixedTransaction = () => {
        showAreYouSureSwal(`The fixed transaction "${fixedTransaction.title}" will be permanently deleted.`, async () => {
            const result = await deleteFixedTransaction(fixedTransaction.id, token);
            if (result.success) {
                dispatch(deleteFixedTransactionAction(fixedTransaction.id));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const destinationName = fixedTransaction.type === "EXPENSE"
        ? categories.find((cat) => cat.id === fixedTransaction.destinationId)?.name || "-"
        : incomeSources.find((src) => src.id === fixedTransaction.destinationId)?.name || "-";

    const renderExecutionInfo = () => {
        if (fixedTransaction.frequency === "DAILY") return "Every Day";
        if (fixedTransaction.frequency === "WEEKLY") return `Day of Week: ${fixedTransaction.executionDay}`;
        if (fixedTransaction.frequency === "MONTHLY") return `Day of Month: ${fixedTransaction.executionDay}`;
        return "";
    };

    return (
        <div className={styles["ft-card"]}>
            <h3 className={styles["ft-card-title"]}>{fixedTransaction.title}</h3>
            <div className={styles["ft-amount"]}>
                <p><strong>Amount:</strong> {fixedTransaction.amount} {currency}</p>
                <div className={styles["ft-card-type"]} data-type={fixedTransaction.type}>
                    {fixedTransaction.type === "EXPENSE" ? "Expense" : "Income"}
                </div>
            </div>
            <p><strong>{fixedTransaction.type === "EXPENSE" ? "Category" : "Source"}:</strong> {destinationName}</p>
            <p><strong>Frequency:</strong> {fixedTransaction.frequency}</p>
            <p><strong>Execution:</strong> {renderExecutionInfo()}</p>

            <div className={styles["ft-card-actions"]}>
                <button className={styles["ft-btn-edit"]}
                    onClick={() => onEditFixedTransaction(fixedTransaction)}>
                    Edit
                </button>
                <button className={styles["ft-btn-delete"]}
                    onClick={handleDeleteFixedTransaction}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FixedTransactionCard;
