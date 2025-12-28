import { useDispatch } from "react-redux";
import { deleteIncome } from "../../../services/incomeService";
import { deleteIncomeAction } from "../../../redux/slices/incomeSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { isWithinNumericLimits } from "../../../utils/validation";
import Table from "../../../components/Table";
import { showSuccessToast } from "../../../utils/toast";

const IncomeTable = ({
    incomes,
    budget,
    handleEditIncome,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteIncome = async (income) => {
        const updatedBudget = budget - income.amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this income will lead the budget to exceed the minimum allowed limit.");
            return;
        }

        showAreYouSureSwal("Once deleted, this income cannot be restored.", async () => {
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
            onEdit={handleEditIncome}
            onDelete={handleDeleteIncome}
            expandableKeys={["incomeSource"]}
            noDataText="No incomes added yet."
            tableClassName="income-table"
        />
    );
};

export default IncomeTable;
