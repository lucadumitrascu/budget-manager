import styles from "./DashboardCard.module.css";

const DashboardCard = ({
    title,
    value,
    currency,
    style
}) => {
    const isPositive = style === "amount-positive" ? true : style === "amount-negative" ? false : undefined;

    return (
        <div className={styles["dashboard-card"]}>
            {title && (
                <div className={styles["card-header"]}>
                    <h4>{title}</h4>
                </div>)}
            <p className={styles[style]}>
                {isPositive !== undefined ? (isPositive ? "+ " : "– ") : ""}
                {value} {currency}
            </p>
        </div>
    );
};

export default DashboardCard;
