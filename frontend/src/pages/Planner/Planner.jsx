import { useState } from "react";
import { useSelector } from "react-redux";
import useLoadAuthenticatedUser from "../../hooks/useLoadAuthenticatedUser";
import useLoadDataByPage from "../../hooks/useLoadDataByPage";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import BudgetTab from "./components/BudgetTab/BudgetTab";
import FixedTransactionsTab from "./components/FixedTransactionsTab/FixedTransactionsTab";
import styles from "./Planner.module.css";

const Planner = () => {
    useLoadDataByPage("planner");
    const { financialInfo, token } = useLoadAuthenticatedUser();
    const categories = useSelector((state) => state.categories);
    const incomeSources = useSelector((state) => state.incomeSources);
    const goals = useSelector((state) => state.goals);
    const planner = useSelector((state) => state.planner);
    const fixedTransactions = useSelector((state) => state.fixedTransactions);

    const [isBudgetTabActive, setIsBudgetTabActive] = useState(true);
    const switchTab = () => setIsBudgetTabActive(t => !t);

    return (
        <MainLayout title="Planner">
            <div className={styles["planner"]}>
                <div className={styles["tab-header"]}>
                    <button onClick={switchTab} className={isBudgetTabActive ? styles["active"] : ""}>
                        Budget
                    </button>
                    <button onClick={switchTab} className={!isBudgetTabActive ? styles["active"] : ""}>
                        Fixed Transactions
                    </button>
                </div>
                {isBudgetTabActive ? (
                    <BudgetTab
                        currency={financialInfo.currency}
                        budget={financialInfo.budget}
                        categories={categories}
                        goals={goals}
                        planner={planner}
                        token={token}
                    />
                ) : (
                    <FixedTransactionsTab
                        currency={financialInfo.currency}
                        fixedTransactions={fixedTransactions}
                        categories={categories}
                        incomeSources={incomeSources}
                        token={token}
                    />
                )}
            </div>
        </MainLayout>
    );
}
export default Planner;