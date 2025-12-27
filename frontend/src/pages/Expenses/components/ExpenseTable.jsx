import { useDispatch } from "react-redux";
import { deleteExpense } from "../../../services/expenseService";
import { deleteExpenseAction } from "../../../redux/slices/expenseSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { isWithinNumericLimits } from "../../../utils/validation";
import Table from "../../../components/Table";
import { showSuccessToast } from "../../../utils/toast";

const ExpenseTable = ({
    expenses,
    budget,
    handleEditExpense,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteExpense = async (expense) => {
        const updatedBudget = budget + expense.amount;
        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this expense will lead the budget to exceed the maximum allowed limit.");
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
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            expandableKeys={["category", "description"]}
            noDataText="No expenses added yet."
            tableClassName="expense-table"
        />
    );
};

export default ExpenseTable;
