import { useDispatch } from "react-redux";
import { deleteExpense } from "../../../services/expenseService";
import { deleteExpenseAction } from "../../../redux/slices/expensesSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { isWithinNumericLimits } from "../../../utils/validation";
import { showSuccessToast } from "../../../utils/toast";
import Table from "../../../components/Table";

const ExpenseTable = ({
    expenses,
    budget,
    onEditExpense,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteExpense = async (expense) => {
        const updatedBudget = budget + expense.amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this expense would exceed the maximum budget limit.");
            return;
        }

        showAreYouSureSwal("Once deleted, it cannot be restored.", async () => {
            const result = await deleteExpense(expense.id, token);
            if (result.success) {
                dispatch(deleteExpenseAction(expense.id));
                dispatch(setBudgetAction(updatedBudget));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const columns = [
        { key: "amount", label: "Amount", sortable: true },
        { key: "category", label: "Category", sortable: true },
        { key: "description", label: "Description" },
        { key: "createdAt", label: "Created At", sortable: true },
    ];

    return (
        <Table
            data={expenses}
            columns={columns}
            onEdit={onEditExpense}
            onDelete={handleDeleteExpense}
            expandableKeys={["category", "description"]}
            noDataText="No expenses added yet."
            tableClassName="expense-table"
        />
    );
};

export default ExpenseTable;
