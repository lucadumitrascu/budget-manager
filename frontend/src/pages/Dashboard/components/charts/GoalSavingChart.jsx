import { Bar } from "react-chartjs-2";
import { getChartColorSet } from "../../utils/getChartColorSet";
import ChartBase from "../ChartBase";

const GoalSavingChart = ({
    goalSavingChartData
}) => {
    const { goalLabels, savedPercentages } = goalSavingChartData;

    const chartLabels = goalLabels.map((label) =>
        label.length > 7 ? label.slice(0, 7) + "…" : label
    );

    const remainingPercentages = savedPercentages.map((p) => parseFloat((100 - p).toFixed(2)));
    const { backgroundColors } = getChartColorSet(goalLabels.length);

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: "Saved (%)",
                data: savedPercentages,
                backgroundColor: backgroundColors,
                borderRadius: 0,
                borderSkipped: false,
                stack: "goal",
            },
            {
                label: "Remaining (%)",
                data: remainingPercentages,
                backgroundColor: "#7f8c8d",
                borderRadius: 0,
                borderSkipped: false,
                stack: "goal",
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "#ffffff",
                    callback: val => `${val}%`,
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
            y: {
                ticks: {
                    color: "#ffffff",
                    font: { size: 12, weight: "bold" },
                    callback: (label, index) => {
                        let fullLabel = goalLabels[index];
                        const firstSpaceIndex = fullLabel.indexOf(" ");

                        if (firstSpaceIndex === -1) {
                            return fullLabel.length > 10 ? fullLabel.slice(0, 10) + "..." : fullLabel;
                        }

                        let firstPart = fullLabel.slice(0, firstSpaceIndex);
                        let secondPart = fullLabel.slice(firstSpaceIndex + 1);

                        if (firstPart.length > 10) {
                            firstPart = firstPart.slice(0, 10) + "...";
                        }
                        if (secondPart.length > 10) {
                            secondPart = secondPart.slice(0, 10) + "...";
                        }

                        return [firstPart, secondPart];
                    },
                },
                grid: {
                    display: true,
                },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (ctx) => {
                        const fullLabel = goalLabels[ctx[0].dataIndex];
                        return fullLabel;
                    },
                    label: (ctx) => {
                        const isSaved = ctx.dataset.label === "Saved (%)";
                        const percentage = ctx.raw.toFixed(1);
                        return isSaved
                            ? `Saved: ${percentage}%`
                            : `Remaining: ${percentage}%`;
                    },
                },
            },
        },
    };

    return (
        <ChartBase title="Goal Progress Overview (%)">
            {goalLabels.length === 0 ? (
                <h2>📊 No goals available to display</h2>
            ) : (
                <Bar data={data} options={options} />
            )}
        </ChartBase>
    );
};

export default GoalSavingChart;
