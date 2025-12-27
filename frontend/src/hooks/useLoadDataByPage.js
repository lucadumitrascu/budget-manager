import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesAction } from "../redux/slices/expenseSlice";
import { setCategoriesAction } from "../redux/slices/categorySlice";
import { getExpenses } from "../services/expenseService";
import { getCategories } from "../services/categoryService";

const useLoadDataByPage = (page = "") => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");
    const expenses = useSelector((state) => state.expenses);
    const categories = useSelector((state) => state.categories);

    const isEmpty = (arr) => !arr || arr.length === 0;

    const fetchExpensesData = async () => {
        const [expensesResult, categoriesResult] = await Promise.all([
            getExpenses(token),
            getCategories(token),
        ]);

        if (expensesResult.success) {
            dispatch(setExpensesAction(expensesResult.data));
        }
        if (categoriesResult.success) {
            dispatch(setCategoriesAction(categoriesResult.data));
        }
    };

    useEffect(() => {
        const shouldFetchByPage = {
            expenses: isEmpty(expenses) || isEmpty(categories),
        };
        if (!shouldFetchByPage[page]) return;

        const fetchDataByPage = async () => {
            switch (page) {
                case "expenses":
                    await fetchExpensesData();
                    break;
                default:
                    break;
            }
        };

        fetchDataByPage();

    }, [page, token]);
};

export default useLoadDataByPage;
