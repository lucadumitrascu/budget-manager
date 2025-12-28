import { useDispatch } from "react-redux";
import { deleteIncomeSource } from "../../../services/incomeSourceService";
import { deleteIncomeSourceAction } from "../../../redux/slices/incomeSourceSlice";
import { deleteIncomesByIncomeSourceAction } from "../../../redux/slices/incomeSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { isWithinNumericLimits } from "../../../utils/validation";
import Table from "../../../components/Table";
import { showSuccessToast } from "../../../utils/toast";

const IncomeSourceTable = ({
    incomeSources,
    incomes,
    budget,
    handleEditIncomeSource,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteIncomeSource = async (incomeSource) => {
        const incomesToRemove = incomes.filter(i => i.incomeSource === incomeSource.name);
        const totalDeletedAmount = incomesToRemove.reduce((sum, i) => sum + i.amount, 0);
        const updatedBudget = budget - totalDeletedAmount;

        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this income source will lead the budget to exceed the minimum allowed limit.");
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
            onEdit={handleEditIncomeSource}
            onDelete={handleDeleteIncomeSource}
            expandableKeys={["name"]}
            noDataText="No income sources added yet."
            tableClassName="income-source-table"
        />
    );
};

export default IncomeSourceTable;
