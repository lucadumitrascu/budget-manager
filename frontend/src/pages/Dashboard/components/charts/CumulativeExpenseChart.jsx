import { Line } from "react-chartjs-2";
import { getChartColorSet } from "../../utils/getChartColorSet";
import ChartBase from "../ChartBase";

const CumulativeExpenseChart = ({
    cumulativeExpenseChartData,
    currency
}) => {
    const { dayLabels, cumulativeAmounts, totalLine } = cumulativeExpenseChartData;
    const chartColors = getChartColorSet(2);

    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: "Cumulative Expenses",
                data: cumulativeAmounts,
                borderColor: chartColors.borderColors[0],
                backgroundColor: chartColors.backgroundColors[0] + "33",
                tension: 0.3,
                fill: true,
                pointRadius: 4,
            },
            {
                label: "Budget",
                data: new Array(dayLabels.length).fill(totalLine),
                borderColor: chartColors.borderColors[1],
                backgroundColor: chartColors.backgroundColors[1] + "33",
                pointRadius: 0,
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
            tooltip: {
                callbacks: {
                    title: () => "",
                    label: (ctx) => {
                        if (ctx.dataset.label === "Budget") return `Allocated/Total Budget: ${totalLine} ${currency}`;
                        const value = ctx.raw;
                        const percent = totalLine ? ((value / totalLine) * 100).toFixed(1) : 0;
                        return `Total spent until day ${ctx.label}: ${value.toFixed(2)} ${currency} (${percent}% of your budget)`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255,255,255,0.05)" },
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
        },
    };

    return (
        <ChartBase title="Cumulative Expenses - This Month">
            <Line data={data} options={options} />
        </ChartBase>
    );
};

export default CumulativeExpenseChart;
