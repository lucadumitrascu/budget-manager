import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesAction } from "../redux/slices/expenseSlice";
import { setCategoriesAction } from "../redux/slices/categorySlice";
import { getExpenses } from "../services/expenseService";
import { getCategories } from "../services/categoryService";
import { getIncomes } from "../services/incomeService";
import { getIncomeSources } from "../services/incomeSourceService";
import { setIncomesAction } from "../redux/slices/incomeSlice";
import { setIncomeSourcesAction } from "../redux/slices/incomeSourceSlice";

const useLoadDataByPage = (page = "") => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");
    const expenses = useSelector((state) => state.expenses);
    const categories = useSelector((state) => state.categories);
    const incomes = useSelector((state) => state.incomes);
    const incomeSources = useSelector((state) => state.incomeSources);

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

    const fetchIncomesData = async () => {
        const [incomesResult, incomeSourcesResult] = await Promise.all([
            getIncomes(token),
            getIncomeSources(token),
        ]);

        if (incomesResult.success) {
            dispatch(setIncomesAction(incomesResult.data));
        }
        if (incomeSourcesResult.success) {
            dispatch(setIncomeSourcesAction(incomeSourcesResult.data));
        }
    };

    useEffect(() => {
        if (!token) return;

        const shouldFetchByPage = {
            expenses: isEmpty(expenses) || isEmpty(categories),
            incomes: isEmpty(incomes) || isEmpty(incomeSources),
        };
        if (!shouldFetchByPage[page]) return;

        const fetchDataByPage = async () => {
            switch (page) {
                case "expenses":
                    await fetchExpensesData();
                    break;
                case "incomes":
                    await fetchIncomesData();
                    break;
                default:
                    break;
            }
        };

        fetchDataByPage();

    }, [page, token]);
};

export default useLoadDataByPage;
