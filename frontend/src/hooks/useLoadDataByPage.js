import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesAction } from "../redux/slices/expensesSlice";
import { setCategoriesAction } from "../redux/slices/categoriesSlice";
import { getExpenses } from "../services/expenseService";
import { getCategories } from "../services/categoryService";
import { getIncomes } from "../services/incomeService";
import { getIncomeSources } from "../services/incomeSourceService";
import { setIncomesAction } from "../redux/slices/incomesSlice";
import { setIncomeSourcesAction } from "../redux/slices/incomeSourcesSlice";
import { getSavings } from "../services/savingService";
import { getGoals } from "../services/goalService";
import { setSavingsAction } from "../redux/slices/savingsSlice";
import { setGoalsAction } from "../redux/slices/goalsSlice";
import { getPlanner } from "../services/plannerService";
import { getFixedTransactions } from "../services/fixedTransactionService";
import { setFixedTransactionsAction } from "../redux/slices/fixedTransactionsSlice";
import { setPlannerAction } from "../redux/slices/plannerSlice";

const useLoadDataByPage = (page = "") => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");
    const expenses = useSelector((state) => state.expenses);
    const categories = useSelector((state) => state.categories);
    const incomes = useSelector((state) => state.incomes);
    const incomeSources = useSelector((state) => state.incomeSources);
    const savings = useSelector((state) => state.savings);
    const goals = useSelector((state) => state.goals);
    const fixedTransactions = useSelector((state) => state.fixedTransactions);

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

    const fetchSavingsData = async () => {
        const [savingsResult, goalsResult] = await Promise.all([
            getSavings(token),
            getGoals(token),
        ]);

        if (savingsResult.success) {
            dispatch(setSavingsAction(savingsResult.data));
        }
        if (goalsResult.success) {
            dispatch(setGoalsAction(goalsResult.data));
        }
    };

    const fetchPlannerData = async () => {
        const fetches = [];

        if (isEmpty(goals)) {
            fetches.push(getGoals(token).then(result => {
                if (result.success) dispatch(setGoalsAction(result.data));
            }));
        }

        if (isEmpty(categories)) {
            fetches.push(getCategories(token).then(result => {
                if (result.success) dispatch(setCategoriesAction(result.data));
            }));
        }

        if (isEmpty(incomeSources)) {
            fetches.push(getIncomeSources(token).then(result => {
                if (result.success) dispatch(setIncomeSourcesAction(result.data));
            }));
        }

        fetches.push(getPlanner(token).then(result => {
            if (result.success) dispatch(setPlannerAction(result.data));
        }));

        fetches.push(getFixedTransactions(token).then(result => {
            if (result.success) dispatch(setFixedTransactionsAction(result.data));
        }));

        await Promise.all(fetches);
    };

    useEffect(() => {
        if (!token) return;

        const shouldFetchByPage = {
            expenses: isEmpty(expenses) || isEmpty(categories),
            incomes: isEmpty(incomes) || isEmpty(incomeSources),
            savings: isEmpty(savings) || isEmpty(goals),
            planner: isEmpty(fixedTransactions),
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
                case "savings":
                    await fetchSavingsData();
                    break;
                case "planner":
                    await fetchPlannerData();
                    break;
                default:
                    break;
            }
        };

        fetchDataByPage();

    }, [page, token]);
};

export default useLoadDataByPage;