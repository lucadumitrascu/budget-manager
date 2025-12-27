import { useState } from "react";
import { useSelector } from "react-redux";
import useLoadAuthenticatedUser from "../../hooks/useLoadAuthenticatedUser";
import useLoadDataByPage from "../../hooks/useLoadDataByPage";
import useModalController from "../../hooks/useModalController";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import EditExpenseModal from "./components/EditExpenseModal";
import CategoryTable from "./components/CategoryTable";
import CategoryModal from "./components/CategoryModal";
import MainLayout from "../../layouts/MainLayout/MainLayout";

function Expenses() {
    useLoadDataByPage("expenses");
    const expenses = useSelector((state) => state.expenses);
    const categories = useSelector((state) => state.categories);
    const { financialInfo, token } = useLoadAuthenticatedUser();

    const [isManagingExpenses, setIsManagingExpenses] = useState(true);
    const toggleView = () => setIsManagingExpenses(v => !v);

    const categoryModalController = useModalController();
    const expenseModalController = useModalController();

    return (
        <MainLayout title="Expenses">
            <ExpenseForm
                budget={financialInfo.budget}
                currency={financialInfo.currency}
                categories={categories}
                toggleView={toggleView}
                toggleViewButtonText={isManagingExpenses ? "Manage Categories" : "Manage Expenses"}
                addCategory={() => categoryModalController.open(null)}
                token={token}
            />

            {isManagingExpenses ? (
                <ExpenseTable
                    expenses={expenses}
                    budget={financialInfo.budget}
                    handleEditExpense={expenseModalController.open}
                    token={token} />
            ) : (
                <CategoryTable
                    categories={categories}
                    expenses={expenses}
                    budget={financialInfo.budget}
                    handleEditCategory={categoryModalController.open}
                    token={token}
                />
            )}
            <CategoryModal
                isOpen={categoryModalController.isOpen}
                onClose={categoryModalController.close}
                title={categoryModalController.item ? "Edit Category" : "Add New Category"}
                primaryButtonText={categoryModalController.item ? "Update" : "Add"}
                category={categoryModalController.item || null}
                categories={categories}
                token={token}
            />

            <EditExpenseModal
                isOpen={expenseModalController.isOpen}
                onClose={expenseModalController.close}
                budget={financialInfo.budget}
                expense={expenseModalController.item}
                categories={categories}
                token={token}
            />
        </MainLayout>
    );
}

export default Expenses;
