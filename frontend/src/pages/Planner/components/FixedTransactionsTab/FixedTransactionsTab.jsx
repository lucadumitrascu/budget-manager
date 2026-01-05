import useModalController from "../../../../hooks/useModalController";
import FixedTransactionModal from "./FixedTransactionModal";
import FixedTransactionCard from "./FixedTransactionCard";
import AddFixedTransactionCard from "./AddFixedTransactionCard";
import styles from "./FixedTransactionsTab.module.css";

const FixedTransactionsTab = ({
    currency,
    categories,
    incomeSources,
    fixedTransactions,
    token,
}) => {
    const fixedTransactionModalController = useModalController();

    return (
        <div className={styles["fixed-transactions-tab"]}>
            <AddFixedTransactionCard
                onAddFixedTransaction={() => fixedTransactionModalController.open(null)}
            />

            {fixedTransactions.map((ft) => (
                <FixedTransactionCard
                    key={ft.id}
                    fixedTransaction={ft}
                    currency={currency}
                    categories={categories}
                    incomeSources={incomeSources}
                    onEditFixedTransaction={fixedTransactionModalController.open}
                    token={token}
                />
            ))}
            <FixedTransactionModal
                isOpen={fixedTransactionModalController.isOpen}
                onClose={fixedTransactionModalController.close}
                title={fixedTransactionModalController.item ? "Edit Transaction" : "Add New Transaction"}
                primaryButtonText={fixedTransactionModalController.item ? "Update" : "Add"}
                fixedTransaction={fixedTransactionModalController.item || null}
                categories={categories}
                incomeSources={incomeSources}
                token={token}
            />
        </div>
    );
};

export default FixedTransactionsTab;
