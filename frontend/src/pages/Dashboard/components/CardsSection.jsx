import DashboardCard from "./DashboardCard";
import styles from "./CardsSection.module.css";

const CardsSection = ({
    budget,
    currency,
    cardsData,
}) => {
    const { totalIncomes, totalExpenses, expenseIncomeRatio } = cardsData;

    return (
        <div className={styles["cards-section"]}>
            <DashboardCard
                title="Total Incomes"
                value={totalIncomes}
                currency={currency}
                style={"amount-positive"}
            />
            <DashboardCard
                title="Total Expenses"
                value={totalExpenses}
                currency={currency}
                style={"amount-negative"}
            />
            <DashboardCard
                title="Budget"
                value={budget.toFixed(2)}
                currency={currency}
                style={"amount-normal"}
            />
            <DashboardCard
                title="Expense/Income Ratio"
                value={expenseIncomeRatio}
                currency={isNaN(expenseIncomeRatio) ? "" : "%"}
                style={"amount-normal"}
            />
        </div>
    );
};

export default CardsSection;
