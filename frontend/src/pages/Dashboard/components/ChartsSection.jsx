import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
);

import CategoryExpenseChart from "./charts/CategoryExpenseChart";
import ExpenseIncomeChart from "./charts/ExpenseIncomeChart";
import GoalSavingChart from "./charts/GoalSavingChart";
import CumulativeExpenseChart from "./charts/CumulativeExpenseChart";
import styles from "./ChartsSection.module.css";

const ChartsSection = ({
    budget,
    currency,
    cumulativeExpenseChartData,
    categoryExpenseChartData,
    goalSavingChartData,
    expenseIncomeChartData,
}) => {
    return (
        <div className={styles["charts-section"]}>
            <div style={{ gridArea: "g1" }}>
                <CategoryExpenseChart
                    categoryExpenseChartData={categoryExpenseChartData}
                    currency={currency}
                />
            </div>
            <div style={{ gridArea: "g2" }}>
                <CumulativeExpenseChart
                    cumulativeExpenseChartData={cumulativeExpenseChartData}
                    currency={currency}
                    budget={budget}
                />
            </div>
            <div style={{ gridArea: "g3" }}>
                <GoalSavingChart
                    goalSavingChartData={goalSavingChartData}
                />
            </div>
            <div style={{ gridArea: "g4" }}>
                <ExpenseIncomeChart
                    expenseIncomeChartData={expenseIncomeChartData}
                />
            </div>
        </div>
    );
};

export default ChartsSection;
