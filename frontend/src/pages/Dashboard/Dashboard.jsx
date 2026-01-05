import { useEffect, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useLoadAuthenticatedUser from "../../hooks/useLoadAuthenticatedUser";
import { getDashboardData } from "../../services/dashboardService";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import CardsSection from "./components/CardsSection";
import ChartsSection from "./components/ChartsSection";

function Dashboard() {
    const { financialInfo, token } = useLoadAuthenticatedUser();
    const { goToLogin } = useNavigation();
    const initialDashboardData = {
        cardsData: {
            totalExpenses: 0,
            totalIncomes: 0,
            expenseIncomeRatio: "0.0"
        },
        expenseIncomeChartData: {
            monthLabels: [],
            incomeValues: [],
            expenseValues: [],
        },
        categoryExpenseChartData: {
            categoryLabels: [],
            categoryAmounts: [],
        },
        goalSavingChartData: {
            goalLabels: [],
            savedPercentages: [],
        },
        cumulativeExpenseChartData: {
            dayLabels: [],
            cumulativeAmounts: [],
            totalLine: 0,
        },
    };
    const [dashboardData, setDashboardData] = useState(initialDashboardData);

    useEffect(() => {
        const loadDashboardData = async () => {
            const result = await getDashboardData(token);

            if (result.success) {
                setDashboardData(result.data);
            } else {
                goToLogin();
            }
        };

        loadDashboardData();
    }, [localStorage.getItem("selectedPeriod")]);

    const {
        cardsData,
        cumulativeExpenseChartData,
        categoryExpenseChartData,
        goalSavingChartData,
        expenseIncomeChartData,
    } = dashboardData;

    return (
        <MainLayout title="Dashboard">
            <CardsSection
                budget={financialInfo.budget}
                currency={financialInfo.currency}
                cardsData={cardsData}
            />
            <ChartsSection
                budget={financialInfo.budget}
                currency={financialInfo.currency}
                cumulativeExpenseChartData={cumulativeExpenseChartData}
                categoryExpenseChartData={categoryExpenseChartData}
                goalSavingChartData={goalSavingChartData}
                expenseIncomeChartData={expenseIncomeChartData}
            />
        </MainLayout>
    );
}

export default Dashboard;
