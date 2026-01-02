import { useState } from "react";
import { useSelector } from "react-redux";
import useLoadAuthenticatedUser from "../../hooks/useLoadAuthenticatedUser";
import useLoadDataByPage from "../../hooks/useLoadDataByPage";
import useModalController from "../../hooks/useModalController";
import IncomeForm from "./components/IncomeForm";
import IncomeTable from "./components/IncomeTable";
import EditIncomeModal from "./components/EditIncomeModal";
import IncomeSourceTable from "./components/IncomeSourceTable";
import IncomeSourceModal from "./components/IncomeSourceModal";
import MainLayout from "../../layouts/MainLayout/MainLayout";

function Incomes() {
    useLoadDataByPage("incomes");
    const incomes = useSelector((state) => state.incomes);
    const incomeSources = useSelector((state) => state.incomeSources);
    const { financialInfo, token } = useLoadAuthenticatedUser();

    const [isManagingIncomes, setIsManagingIncomes] = useState(true);
    const toggleView = () => setIsManagingIncomes(v => !v);

    const incomeSourceModalController = useModalController();
    const incomeModalController = useModalController();

    return (
        <MainLayout title="Incomes">
            <IncomeForm
                budget={financialInfo.budget}
                currency={financialInfo.currency}
                incomeSources={incomeSources}
                toggleView={toggleView}
                toggleViewButtonText={isManagingIncomes ? "Manage Sources" : "Manage Incomes"}
                onAddIncomeSource={() => incomeSourceModalController.open(null)}
                token={token}
            />

            {isManagingIncomes ? (
                <IncomeTable
                    incomes={incomes}
                    budget={financialInfo.budget}
                    onEditIncome={incomeModalController.open}
                    token={token} />
            ) : (
                <IncomeSourceTable
                    incomeSources={incomeSources}
                    incomes={incomes}
                    budget={financialInfo.budget}
                    onEditIncomeSource={incomeSourceModalController.open}
                    token={token}
                />
            )}

            <IncomeSourceModal
                isOpen={incomeSourceModalController.isOpen}
                onClose={incomeSourceModalController.close}
                title={incomeSourceModalController.item ? "Edit Income Source" : "Add New Income Source"}
                primaryButtonText={incomeSourceModalController.item ? "Update" : "Add"}
                incomeSource={incomeSourceModalController.item || null}
                incomeSources={incomeSources}
                token={token}
            />

            <EditIncomeModal
                isOpen={incomeModalController.isOpen}
                onClose={incomeModalController.close}
                budget={financialInfo.budget}
                income={incomeModalController.item}
                incomeSources={incomeSources}
                token={token}
            />
        </MainLayout>
    );
}

export default Incomes;
