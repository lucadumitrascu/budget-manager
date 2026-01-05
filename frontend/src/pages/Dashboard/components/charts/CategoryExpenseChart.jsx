import { Pie } from "react-chartjs-2";
import { PERIOD_OPTIONS } from "../../../../utils/constants";
import { getChartColorSet } from "../../utils/getChartColorSet";
import ChartBase from "../ChartBase";

const CategoryExpenseChart = ({
    categoryExpenseChartData,
    currency,
}) => {
    const { categoryLabels, categoryAmounts } = categoryExpenseChartData;

    const chartLabels = categoryLabels.map((label) =>
        label.length > 15 ? label.slice(0, 15) + "…" : label
    );
    const chartColors = getChartColorSet(chartLabels.length);

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: "Expenses",
                data: categoryAmounts,
                backgroundColor: chartColors.backgroundColors,
                borderColor: chartColors.borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    color: "#ffffff",
                    font: { size: 13, weight: "bold" },
                    boxWidth: 20,
                    boxHeight: 10,
                    padding: 5,
                    textAlign: "left",
                },
            },
            tooltip: {
                callbacks: {
                    title: () => "",
                    label: (ctx) => {
                        const fullLabel = categoryLabels[ctx.dataIndex];
                        const value = ctx.raw;
                        const total = ctx.dataset.data.reduce((sum, val) => sum + val, 0) || 1;
                        const percent = ((value / total) * 100).toFixed(1);
                        return ` ${fullLabel}: ${value.toFixed(2)} ${currency} (${percent}%)`;
                    },
                },
            },
        },
    };

    const getSelectedPeriodLabel = () => {
        const selectedPeriod = localStorage.getItem("selectedPeriod") || "last30";
        const option = PERIOD_OPTIONS.find((p) => p.value === selectedPeriod);
        return option ? option.label : "Selected period";
    };

    return (
        <ChartBase title={`Expenses by Category - ${getSelectedPeriodLabel()}`} paddingTop={true}>
            {chartLabels.length === 0 ? (
                <h2>📊 No expenses recorded - {getSelectedPeriodLabel()}</h2>
            ) : (
                <Pie data={data} options={options} />
            )}
        </ChartBase>
    );
};

export default CategoryExpenseChart;
