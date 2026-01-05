import { Line } from "react-chartjs-2";
import { getChartColorSet } from "../../utils/getChartColorSet";
import ChartBase from "../ChartBase";

const ExpenseIncomeChart = ({
    expenseIncomeChartData
}) => {
    const { monthLabels, incomeValues, expenseValues } = expenseIncomeChartData;
    const chartColors = getChartColorSet(2);

    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: "Incomes",
                data: incomeValues,
                borderColor: chartColors.borderColors[0],
                backgroundColor: chartColors.backgroundColors[0] + "33",
                tension: 0.4,
                fill: false,
                pointRadius: 4,
            },
            {
                label: "Expenses",
                data: expenseValues,
                borderColor: chartColors.borderColors[1],
                backgroundColor: chartColors.backgroundColors[1] + "33",
                tension: 0.4,
                fill: false,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#ffffff",
                    font: { size: 12, weight: "bold" },
                    boxWidth: 30,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255, 255, 255, 0.1)" },
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255, 255, 255, 0.1)" },
            },
        },
    };

    return (
        <ChartBase title="Monthly Incomes vs Expenses">
            <Line data={data} options={options} />
        </ChartBase>
    );
};

export default ExpenseIncomeChart;
