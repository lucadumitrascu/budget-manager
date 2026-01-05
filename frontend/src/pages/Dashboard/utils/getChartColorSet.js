const chartColors = [
    "#EF9A9A", "#F06292", "#F48FB1",
    "#CE93D8", "#BA68C8", "#7986CB",
    "#90CAF9", "#64B5F6", "#4DD0E1",
    "#4DB6AC", "#A5D6A7", "#81C784",
    "#DCE775", "#FFD54F", "#FF8A65",
];

export const getChartColorSet = (count) => {
    const shuffledColors = [...chartColors].sort(() => 0.5 - Math.random());
    const selectedColors = shuffledColors.slice(0, count);

    return {
        backgroundColors: selectedColors,
        borderColors: selectedColors,
    };
};
