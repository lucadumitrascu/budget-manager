import { useDispatch } from "react-redux";
import { deleteSaving } from "../../../services/savingService";
import { deleteSavingAction } from "../../../redux/slices/savingsSlice";
import { adjustGoalCurrentAmountAction } from "../../../redux/slices/goalsSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { isWithinNumericLimits } from "../../../utils/validation";
import { showSuccessToast } from "../../../utils/toast";
import Table from "../../../components/Table";

const SavingTable = ({
    savings,
    budget,
    goals,
    onEditSaving,
    token
}) => {
    const dispatch = useDispatch();

    const handleDeleteSaving = async (saving) => {
        const updatedBudget = budget + saving.amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this saving would cause the budget to exceed the maximum allowed.");
            return;
        }

        showAreYouSureSwal("Once deleted, it cannot be restored.", async () => {
            const result = await deleteSaving(saving.id, token);
            if (result.success) {
                dispatch(deleteSavingAction(saving.id));
                dispatch(setBudgetAction(updatedBudget));
                const goal = goals.find(g => g.name === saving.goal);
                if (goal) {
                    dispatch(adjustGoalCurrentAmountAction({
                        goalName: goal.name,
                        amount: -saving.amount
                    }));
                }
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const columns = [
        { key: "amount", label: "Amount", sortable: true },
        { key: "createdAt", label: "Created at", sortable: true },
    ];

    return (
        <Table
            data={savings}
            columns={columns}
            onEdit={onEditSaving}
            onDelete={handleDeleteSaving}
            expandableKeys={["goal"]}
            noDataText="No savings found for this goal."
            tableClassName="category-table"
        />
    );
};

export default SavingTable;
