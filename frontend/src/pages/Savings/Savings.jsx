import { useSelector } from "react-redux";
import useLoadAuthenticatedUser from "../../hooks/useLoadAuthenticatedUser";
import useLoadDataByPage from "../../hooks/useLoadDataByPage";
import useModalController from "../../hooks/useModalController";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SavingSummary from "./components/SavingSummary";
import GoalsSection from "./components/GoalsSection";
import GoalModal from "./components/GoalModal";
import SavingModal from "./components/SavingModal";

function Savings() {
    useLoadDataByPage("savings");
    const { financialInfo, token } = useLoadAuthenticatedUser();
    const savings = useSelector((state) => state.savings);
    const goals = useSelector((state) => state.goals);

    const savingModalController = useModalController();
    const goalModalController = useModalController();

    return (
        <MainLayout title="Savings">
            <SavingSummary
                currency={financialInfo.currency}
                goals={goals}
                onAddGoal={() => goalModalController.open(null)}
                onAddSaving={() => savingModalController.open(null)}
            />
            <GoalsSection
                budget={financialInfo.budget}
                currency={financialInfo.currency}
                goals={goals}
                savings={savings}
                onEditGoal={goalModalController.open}
                onEditSaving={savingModalController.open}
                token={token}
            />
            <GoalModal
                isOpen={goalModalController.isOpen}
                onClose={goalModalController.close}
                title={goalModalController.item ? "Edit Goal" : "Add New Goal"}
                primaryButtonText={goalModalController.item ? "Update" : "Add"}
                goal={goalModalController.item || null}
                goals={goals}
                token={token}
            />
            <SavingModal
                isOpen={savingModalController.isOpen}
                onClose={savingModalController.close}
                title={savingModalController.item ? "Edit Saving" : "Add New Saving"}
                primaryButtonText={savingModalController.item ? "Update" : "Add"}
                budget={financialInfo.budget}
                saving={savingModalController.item || null}
                goals={goals}
                token={token}
            />
        </MainLayout>
    );
}

export default Savings;
