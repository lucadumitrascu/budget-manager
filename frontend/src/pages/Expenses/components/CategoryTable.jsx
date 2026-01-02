import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../services/categoryService";
import { deleteCategoryAction } from "../../../redux/slices/categoriesSlice";
import { deleteExpensesByCategoryAction } from "../../../redux/slices/expensesSlice";
import { setBudgetAction } from "../../../redux/slices/financialInfoSlice";
import { showAreYouSureSwal, showErrorSwal } from "../../../utils/swal";
import { showSuccessToast } from "../../../utils/toast";
import { isWithinNumericLimits } from "../../../utils/validation";
import Table from "../../../components/Table";

const CategoryTable = ({
    categories,
    expenses,
    budget,
    onEditCategory,
    token,
}) => {
    const dispatch = useDispatch();

    const handleDeleteCategory = async (category) => {
        const expensesToRemove = expenses.filter(e => e.category === category.name);
        const totalDeletedAmount = expensesToRemove.reduce((sum, e) => sum + e.amount, 0);
        const updatedBudget = budget + totalDeletedAmount;

        if (!isWithinNumericLimits(updatedBudget)) {
            showErrorSwal("Deleting this category would exceed the maximum budget limit.");
            return;
        }

        showAreYouSureSwal("All expenses associated with this category will be deleted.", async () => {
            const result = await deleteCategory(category.id, token);
            if (result.success) {
                dispatch(deleteCategoryAction(category.id));
                dispatch(deleteExpensesByCategoryAction(category.name));
                dispatch(setBudgetAction(updatedBudget));
                showSuccessToast(result.message);
            } else {
                showErrorSwal(result.message);
            }
        });
    };

    const columns = [
        { key: "name", label: "Category", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true },
    ];

    return (
        <Table
            data={categories}
            columns={columns}
            onEdit={onEditCategory}
            onDelete={handleDeleteCategory}
            expandableKeys={["name"]}
            noDataText="No categories added yet."
            tableClassName="category-table"
        />
    );
};

export default CategoryTable;
