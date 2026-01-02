import { useDispatch } from "react-redux";
import { deleteIncomeSource } from "../../../services/incomeSourceService";
import { deleteIncomeSourceAction } from "../../../redux/slices/incomeSourcesSlice";
import { deleteIncomesByIncomeSourceAction } from "../../../redux/slices/incomesSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { showSuccessToast } from "../../../utils/toast";
import { isWithinNumericLimits } from "../../../utils/validation";
import Table from "../../../components/Table";

const IncomeSourceTable = ({
    incomeSources,
    incomes,
    budget,
    onEditIncomeSource,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteIncomeSource = async (incomeSource) => {
        const incomesToRemove = incomes.filter(i => i.incomeSource === incomeSource.name);
        const totalDeletedAmount = incomesToRemove.reduce((sum, i) => sum + i.amount, 0);
        const updatedBudget = budget - totalDeletedAmount;

        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this income source would reduce the budget below the minimum limit.");
            return;
        }

        showAreYouSureSwal("All incomes associated with this source will be deleted.", async () => {
            const result = await deleteIncomeSource(incomeSource.id, token);
            if (result.success) {
                dispatch(deleteIncomeSourceAction(incomeSource.id));
                dispatch(deleteIncomesByIncomeSourceAction(incomeSource.name));
                dispatch(setBudgetAction(updatedBudget));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const columns = [
        { key: "name", label: "Income Source", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true },
    ];

    return (
        <Table
            data={incomeSources}
            columns={columns}
            onEdit={onEditIncomeSource}
            onDelete={handleDeleteIncomeSource}
            expandableKeys={["name"]}
            noDataText="No income sources added yet."
            tableClassName="income-source-table"
        />
    );
};

export default IncomeSourceTable;
