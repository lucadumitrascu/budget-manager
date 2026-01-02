import { useDispatch } from "react-redux";
import { deleteIncome } from "../../../services/incomeService";
import { deleteIncomeAction } from "../../../redux/slices/incomesSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { isWithinNumericLimits } from "../../../utils/validation";
import { showSuccessToast } from "../../../utils/toast";
import Table from "../../../components/Table";

const IncomeTable = ({
    incomes,
    budget,
    onEditIncome,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteIncome = async (income) => {
        const updatedBudget = budget - income.amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this income would reduce the budget below the minimum limit.");
            return;
        }

        showAreYouSureSwal("Once deleted, it cannot be restored.", async () => {
            const result = await deleteIncome(income.id, token);
            if (result.success) {
                dispatch(deleteIncomeAction(income.id));
                dispatch(setBudgetAction(updatedBudget));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const columns = [
        { key: "amount", label: "Amount", sortable: true },
        { key: "incomeSource", label: "Income Source", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true },
    ];

    return (
        <Table
            data={incomes}
            columns={columns}
            onEdit={onEditIncome}
            onDelete={handleDeleteIncome}
            expandableKeys={["incomeSource"]}
            noDataText="No incomes added yet."
            tableClassName="income-table"
        />
    );
};

export default IncomeTable;
