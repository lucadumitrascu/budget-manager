import styles from "./FixedTransactionCard.module.css"

const AddFixedTransactionCard = ({
    onAddFixedTransaction
}) => {

    return (
        <div className={styles["ft-add-card"]} onClick={onAddFixedTransaction}>
            <div className={styles["ft-plus-sign"]}>+</div>
            <p>Add New Transaction</p>
        </div>
    );
};

export default AddFixedTransactionCard;
